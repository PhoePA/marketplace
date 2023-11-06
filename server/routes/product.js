const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();

const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");

// Post / create
router.post(
  "/create-product",authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("You must enter your Product Name"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Please enter the product description")
      .isLength({ min: 5 }),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Please select a category"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Please describe the price of your product"),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Please describe how long had been used"),
    body("product_details")
      .isArray()
      .withMessage("Please describe product details"),
  ],
  productController.addNewProduct
);

module.exports = router;
