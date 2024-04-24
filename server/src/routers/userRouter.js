const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
} = require("../controllers/userController");

////GET: api/users
userRouter.get("/", getUsers);
userRouter.post("/process-register", processRegister);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserByID);

module.exports = { userRouter };
