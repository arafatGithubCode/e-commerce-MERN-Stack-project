const { body } = require("express-validator");

//category validation
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3 })
    .withMessage("Category name should be atleast 3 characters log"),
];

module.exports = {
  validateCategory,
};
