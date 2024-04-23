const userRouter = require("express").Router();

const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");

////GET: api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };
