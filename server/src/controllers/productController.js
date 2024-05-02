const slugify = require("slugify");
const mongoose = require("mongoose");
const createError = require("http-errors");

const Product = require("../models/productModel");
const { successResponse } = require("./responseController");
const { createProduct } = require("../services/productService");

const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, sold, quantity, shipping, category } =
      req.body;

    const image = req.file?.path;

    const productData = {
      name,
      description,
      price,
      sold,
      quantity,
      shipping,
      category,
      image,
    };

    const product = await createProduct(productData);

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
