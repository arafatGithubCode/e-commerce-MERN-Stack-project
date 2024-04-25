const userRouter = require("express").Router();

const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
} = require("../controllers/userController");
const upload = require("../middlewares/uploadFile");
const runValidation = require("../validators");
const { validateUserRegistration } = require("../validators/auth");

////GET: api/users
userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserByID);

module.exports = { userRouter };
