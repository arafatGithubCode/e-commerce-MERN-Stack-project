const mongoose = require("mongoose");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const { createProduct } = require("../services/productService");

const handleCreateProduct = async (req, res, next) => {
  try {
    const image = req.file?.path;

    const product = await createProduct(req.body, image);

    return successResponse(res, {
      statusCode: 201,
      message: "A product was created successfully.",
      payload: { product },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

module.exports = { handleCreateProduct };
