const mongoose = require("mongoose");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const {
  createProduct,
  getProducts,
  getProductBySlug,
  deleteProductBySlug,
} = require("../services/productService");
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
        pagination: {
          totalPages,
          totalNumberOfProducts,
          currentPage,
          previousPage,
          nextPage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await getProductBySlug(slug);

    return successResponse(res, {
      statusCode: 201,
      message: "A product was returned successfully.",
      payload: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    await deleteProductBySlug(slug);

    return successResponse(res, {
      statusCode: 201,
      message: "A product was deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
};
