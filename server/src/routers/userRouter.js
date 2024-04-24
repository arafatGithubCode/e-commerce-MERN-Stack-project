const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
} = require("../controllers/userController");

////GET: api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserByID);

module.exports = { userRouter };
