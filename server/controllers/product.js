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
