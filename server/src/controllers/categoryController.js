const mongoose = require("mongoose");

const { successResponse } = require("./responseController");
const {
  createCategory,
  getCategories,
  getCategory,
} = require("../services/categoryService");

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await createCategory(name);

    return successResponse(res, {
      statusCode: 200,
      message: `${name} category was created successfully.`,
      payload: { newCategory },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();

    return successResponse(res, {
      statusCode: 200,
      message: "Categories were returned successfully.",
      payload: { categories },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const handleGetCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getCategory(slug);

    return successResponse(res, {
      statusCode: 200,
      message: "A category was returned successfully.",
      payload: { category },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

module.exports = {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
};
