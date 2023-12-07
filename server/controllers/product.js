const { validationResult } = require("express-validator");

const Product = require("../models/Product");

exports.addNewProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array[0].msg,
    });
  }
  const {
    product_name,
    product_description,
    product_category,
    product_price,
    product_used_for,
    product_details,
  } = req.body;

  try {
    const productDoc = await Product.create({
      name: product_name,
      description: product_description,
      category: product_category,
      price: product_price,
      usedFor: product_used_for,
      details: product_details,
      seller: req.userId,
    });
    res.status(201).json({
      isSuccess: true,
      message: "Product added to Sale List.",
      productDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ seller: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getOldProduct = async (req, res) => {
  try {
    const productDoc = await Product.findOne({ _id: req.params.id });

    return res.status(200).json({
      isSuccess: true,
      productDoc,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array[0].msg,
    });
  }
  try {
    const {
      product_name,
      product_description,
      product_category,
      product_price,
      product_used_for,
      product_details,
      seller_id,
      product_id,
    } = req.body;
    if (req.userId.toString() !== seller_id) {
      throw new Error("User is not Authorized!");
    }
    const productDoc = await Product.findOne({ _id: product_id });
    productDoc.name = product_name;
    productDoc.description = product_description;
    productDoc.category = product_category;
    productDoc.price = product_price;
    productDoc.usedFor = product_used_for;
    productDoc.details = product_details;
    productDoc.save();
    res.status(200).json({
      isSuccess: true,
      message: "Product details were updated.",
      productDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findOne({ _id: id });
    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("User is not Authorized!");
    }
    await Product.findByIdAndRemove(id);

    return res.status(202).json({
      isSuccess: true,
      message: "Product has been deleted!",
      productDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
