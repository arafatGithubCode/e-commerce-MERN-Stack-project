const createError = require("http-errors");
const slugify = require("slugify");

const Product = require("../models/productModel");
const { deleteImage } = require("../helper/deleteImage");

const createProduct = async (productData, image) => {
  if (!image) {
    throw createError(400, "product Image is required.");
  } else {
    productData.image = image;
  }

  if (image.size > 1024 * 1024 * 2) {
    throw createError(400, "File too large. It must be less then 2 MB.");
  }

  const productExist = await Product.exists({ title: productData.title });
  if (productExist) {
    throw createError(409, "This product is already exist.");
  }

  const product = await Product.create({
    ...productData,
    slug: slugify(productData.title),
  });

  return product;
};

const getProducts = async (page = 1, limit = 5) => {
  const products = await Product.find({})
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!products) {
    throw createError(400, "No products found.");
  }

  const count = await Product.find({}).countDocuments();

  const totalPages = Math.ceil(count / limit);
  const previousPage = page - 1 > 0 ? page - 1 : null;
  const nextPage = page + 1 <= Math.ceil(count / limit) ? page + 1 : null;
  const totalNumberOfProducts = count;
  const currentPage = page;

  return {
    products,
    totalPages,
    previousPage,
    nextPage,
    totalNumberOfProducts,
    currentPage,
  };
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug }).populate("category");
  if (!product) {
    throw createError(400, "No product found.");
  }

  return product;
};

const deleteProductBySlug = async (slug) => {
  const product = await Product.findOneAndDelete({ slug });
  if (!product) {
    throw createError(400, "No product found.");
  } else {
    deleteImage(product.image);
  }

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  deleteProductBySlug,
};
