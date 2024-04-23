const userRouter = require("express").Router();

const { getUser } = require("../controllers/userController");

userRouter.get("/", getUser);

module.exports = { userRouter };
