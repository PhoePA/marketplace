const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();

const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");

// Post / create
router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Please enter Your Product Name"),
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

// get all products
// GET / products
router.get("/products/", authMiddleware, productController.getAllProducts);

// get old single product
// GET /products/:id
router.get("/products/:id", authMiddleware, productController.getOldProduct);

// update product
// POST /update-product
router.post(
  "/update-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Please Enter Your Product Name!"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Please Enter the Product Description")
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
  productController.updateProduct
);

//delete product
// DELETE /product/:id
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
