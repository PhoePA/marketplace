const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;
  try {
    // check user-email already exists
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      throw new Error("The User already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create User in model
    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "User was created Successfully!",
    });
  } catch (error) {
    return res.status(409).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  try {
    // check user email
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      throw new Error("Email does not exist!");
    }

    // check password
    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
      throw new Error("Invalid Password!");
    }

    // create jwttoken
    const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Logged in Successfully!",
      token,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.checkCurrentUser = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.userId).select("name email role");
    if (!userDoc) {
      throw new Error("Unauthorized User!");
    }
    res.status(200).json({
      isSuccess: true,
      message: "User is authorized",
      userDoc,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
