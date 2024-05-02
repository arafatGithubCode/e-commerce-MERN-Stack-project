const { body } = require("express-validator");

//product validation
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Product name should be minimum 3 to maximum 50 characters log"
    ),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required.")
    .isLength({ min: 3, max: 500 })
    .withMessage(
      "Product description should be minimum 3 to maximum 500 characters log"
    ),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Product price is required.")
    .isFloat({ min: 0 })
    .withMessage("Product price should be greater then zero."),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Product category is required."),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Product quantity is required.")
    .isInt({ min: 0 })
    .withMessage("Product price should be greater then zero."),
];

module.exports = {
  validateProduct,
};
