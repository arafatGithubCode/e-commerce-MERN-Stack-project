const mongoose = require("mongoose");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} = require("../services/categoryService");

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await createCategory(name);

    if (!newCategory) {
      throw createError(401, "Failed to create category.");
    }

    return successResponse(res, {
      statusCode: 201,
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

    if (!categories) {
      throw createError(401, "Failed to get categories.");
    }

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

    if (!category) {
      throw createError(401, "Failed to get a category.");
    }

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

const handleUpdateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;

    const updatedCategory = await updateCategory(name, slug);

    if (!updatedCategory) {
      throw createError(401, "Failed to update this category.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: `${name} category was created successfully.`,
      payload: { updatedCategory },
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
  handleUpdateCategory,
};
