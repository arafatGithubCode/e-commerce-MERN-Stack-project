const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
  updateUserByID,
  handleManageUserStatusByID,
} = require("../controllers/userController");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const uploadUserImage = require("../middlewares/uploadFile");
const runValidation = require("../validators");
const { validateUserRegistration } = require("../validators/auth");

//GET: api/users
userRouter.post(
  "/process-register",
  uploadUserImage.single("image"),
  isLoggedOut,
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", isLoggedOut, activateUserAccount);
userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUserByID);
userRouter.delete("/:id", isLoggedIn, deleteUserByID);
userRouter.put(
  "/:id",
  uploadUserImage.single("image"),
  isLoggedIn,
  updateUserByID
);
userRouter.put(
  "/manage-user/:id",
  isLoggedIn,
  isAdmin,
  handleManageUserStatusByID
);

module.exports = { userRouter };
