const authRouter = require("express").Router();
const runValidation = require("../validators");

const { handleLogin } = require("../controllers/authController");

authRouter.post("/login", handleLogin);

module.exports = authRouter;
