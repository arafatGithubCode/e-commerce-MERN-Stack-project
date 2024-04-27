const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
  updateUserByID,
} = require("../controllers/userController");
const uploadUserImage = require("../middlewares/uploadFile");
const runValidation = require("../validators");
const { validateUserRegistration } = require("../validators/auth");

////GET: api/users
userRouter.post(
  "/process-register",
  uploadUserImage.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserByID);
userRouter.put("/:id", uploadUserImage.single("image"), updateUserByID);

module.exports = { userRouter };
