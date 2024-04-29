const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
  updateUserByID,
} = require("../controllers/userController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
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
userRouter.get("/", isLoggedIn, getUsers);
userRouter.get("/:id", isLoggedIn, getUserByID);
userRouter.delete("/:id", isLoggedIn, deleteUserByID);
userRouter.put(
  "/:id",
  uploadUserImage.single("image"),
  isLoggedIn,
  updateUserByID
);

module.exports = { userRouter };
