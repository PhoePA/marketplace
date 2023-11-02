const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

// create new user POST-> register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Please Enter Your Name!")
      .isLength({ min: 4 })
      .withMessage("Name must have at least 4 characters!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be filled!")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 Characters!"),
    body("email").trim().isEmail().withMessage("Please Enter a Valid E-mail"),
  ],
  authController.register
);

// login  user POST-> login
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be filled!")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 Characters!"),
    body("email").trim().isEmail().withMessage("Please Enter a Valid E-mail"),
  ],
  authController.login
);

// check user is login or not
router.get(
  "/get-current-user",
  authMiddleware,
  authController.checkCurrentUser
);

module.exports = router;
