const mongoose = require("mongoose");

const { successResponse } = require("./responseController");
const { createCategory } = require("../services/categoryService");

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

module.exports = { handleCreateCategory };
