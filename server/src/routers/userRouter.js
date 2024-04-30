const userRouter = require("express").Router();

const {
  handleManageUserStatusByID,
  handleActivateUserAccount,
  handleGetUsers,
  handleGetUserByID,
  handleDeleteUserByID,
  handleUpdateUserByID,
  handleProcessRegister,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
} = require("../controllers/userController");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const uploadUserImage = require("../middlewares/uploadFile");
const runValidation = require("../validators");
const {
  validateUserRegistration,
  validateUserUpdatePassword,
  validateUserForgetPassword,
  validateUserResetPassword,
} = require("../validators/auth");

//GET: api/users
userRouter.post(
  "/process-register",
  uploadUserImage.single("image"),
  isLoggedOut,
  validateUserRegistration,
  runValidation,
  handleProcessRegister
);
userRouter.post("/verify", isLoggedOut, handleActivateUserAccount);
userRouter.get("/", isLoggedIn, isAdmin, handleGetUsers);
userRouter.put(
  "/reset-password",
  validateUserResetPassword,
  runValidation,
  handleResetPassword
);
userRouter.get("/:id", isLoggedIn, handleGetUserByID);
userRouter.delete("/:id", isLoggedIn, handleDeleteUserByID);
userRouter.put(
  "/:id",
  uploadUserImage.single("image"),
  isLoggedIn,
  handleUpdateUserByID
);
userRouter.put(
  "/manage-user/:id",
  isLoggedIn,
  isAdmin,
  handleManageUserStatusByID
);
userRouter.put(
  "/update-password/:id",
  validateUserUpdatePassword,
  runValidation,
  isLoggedIn,
  handleUpdatePassword
);
userRouter.post(
  "/forget-password",
  validateUserForgetPassword,
  runValidation,
  handleForgetPassword
);

module.exports = { userRouter };
