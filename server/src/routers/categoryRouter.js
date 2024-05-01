const categoryRouter = require("express").Router();

const { handleCreateCategory } = require("../controllers/categoryController");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const runValidation = require("../validators");
const { validateCategory } = require("../validators/category");

// POST: /api/categories
categoryRouter.post(
  "/",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateCategory
);

module.exports = { categoryRouter };
