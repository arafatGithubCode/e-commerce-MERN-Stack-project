const authRouter = require("express").Router();
const runValidation = require("../validators");

const { handleLogin, handleLogout } = require("../controllers/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");

authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogout);

module.exports = authRouter;
