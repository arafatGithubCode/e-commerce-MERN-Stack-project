const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
} = require("../controllers/userController");

////GET: api/users
userRouter.post("/process-register", processRegister);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserByID);

module.exports = { userRouter };
