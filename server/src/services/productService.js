const createError = require("http-errors");
const slugify = require("slugify");

const Product = require("../models/productModel");

const createProduct = async (productData) => {
  const {
    name,
    description,
    price,
    sold,
    quantity,
    shipping,
    category,
    image,
  } = productData;

  if (!image) {
    throw createError(400, "product Image is required.");
  }

  if (image.size > 1024 * 1024 * 2) {
    throw createError(400, "File too large. It must be less then 2 MB.");
  }

  const productExist = await Product.exists({ name: name });
  if (productExist) {
    throw createError(409, "This product is already exist.");
  }

  const product = await Product.create({
    name: name,
    slug: slugify(name),
    description: description,
    price: price,
    quantity: quantity,
    sold: sold,
    image: image,
    category: category,
    shipping: shipping,
  });

  return product;
};

module.exports = { createProduct };
