const userRouter = require("express").Router();

const {
  handleManageUserStatusByID,
  handleActivateUserAccount,
  handleGetUsers,
  handleGetUserByID,
  handleDeleteUserByID,
  handleUpdateUserByID,
  handleProcessRegister,
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
  handleProcessRegister
);
userRouter.post("/verify", isLoggedOut, handleActivateUserAccount);
userRouter.get("/", isLoggedIn, isAdmin, handleGetUsers);
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

module.exports = { userRouter };
