const mongoose = require("mongoose");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const { createProduct, getProducts } = require("../services/productService");
const Product = require("../models/productModel");

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

const handleGetProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const productInfo = await getProducts(page, limit);
    const {
      products,
      totalPages,
      previousPage,
      nextPage,
      totalNumberOfProducts,
      currentPage,
    } = productInfo;

    return successResponse(res, {
      statusCode: 201,
      message: "Products were returned successfully.",
      payload: {
        products,
        totalPages,
        totalNumberOfProducts,
        currentPage,
        previousPage,
        nextPage,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

module.exports = { handleCreateProduct, handleGetProducts };
