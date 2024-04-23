const userRouter = require("express").Router();

const { getUsers, getUser } = require("../controllers/userController");

////GET: api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

module.exports = { userRouter };
