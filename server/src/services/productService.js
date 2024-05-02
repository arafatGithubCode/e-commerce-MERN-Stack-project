const createError = require("http-errors");
const slugify = require("slugify");

const Product = require("../models/productModel");

const createProduct = async (productData, image) => {
  if (!image) {
    throw createError(400, "product Image is required.");
  } else {
    productData.image = image;
  }

  if (image.size > 1024 * 1024 * 2) {
    throw createError(400, "File too large. It must be less then 2 MB.");
  }

  const productExist = await Product.exists({ name: productData.name });
  if (productExist) {
    throw createError(409, "This product is already exist.");
  }

  const product = await Product.create({
    ...productData,
    slug: slugify(productData.name),
  });

  return product;
};

module.exports = { createProduct };
