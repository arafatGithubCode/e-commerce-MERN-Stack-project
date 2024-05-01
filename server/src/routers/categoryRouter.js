const categoryRouter = require("express").Router();

const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require("../controllers/categoryController");
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
// GET: /api/categories
categoryRouter.get("/", handleGetCategories);
// GET: /api/category
categoryRouter.get("/:slug", handleGetCategory);
// PUT: /api/category
categoryRouter.put(
  "/:slug",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleUpdateCategory
);
// DELETE: /api/category
categoryRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteCategory);

module.exports = { categoryRouter };
