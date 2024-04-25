const { body } = require("express-validator");

//Registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your full name.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be atleast 3 to 31 characters log"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address.")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password.")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters log")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/)
    .withMessage(
      "Password should contain at least one uppercase and lowercase letter, one special character, and one number"
    ),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required. Enter your address.")
    .isLength({ min: 3 })
    .withMessage("Address should be atleast 3 characters log"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required. Enter your phone number."),
  body("image")
    .custom((value, { req }) => {
      if (!req.file || !req.file.buffer) {
        throw new Error("User image is required");
      }
      return true;
    })
    .withMessage("User image is required"),
];

module.exports = { validateUserRegistration };
