const createError = require("http-errors");
const slugify = require("slugify");

const cloudinary = require("../config/cloudinary");
const Product = require("../models/productModel");
const { deleteImage } = require("../helper/deleteImage");

const {
  publicIDWithoutExtensionFromUrl,
  deleteFileFromCloudinary,
} = require("../helper/deleteCloudinaryFile");

const createProduct = async (productData, image) => {
  if (!image) {
    throw createError(400, "product Image is required.");
  } else {
    const response = await cloudinary.uploader.upload(image, {
      folder: "e-commerce-mern/products",
    });
    productData.image = response.secure_url;
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
  const products = await Product.find()
    .populate("category")
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  if (!products) {
    throw createError(400, "No products found.");
  }

  const count = await Product.find().countDocuments();

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
    const publicID = await publicIDWithoutExtensionFromUrl(product.image);
    await deleteFileFromCloudinary(
      "e-commerce-mern/products",
      publicID,
      "Product"
    );
  }

  return product;
};

const updateProductBySlug = async (slug, updates, image) => {
  const product = await Product.findOne({ slug });

  const updateOptions = { new: true, runValidators: true, context: "query" };

  if (updates.title) {
    updates.slug = slugify(updates.title);
  }

  if (image) {
    if (image.size > 1024 * 1024 * 2) {
      throw createError(400, "File too large. It must be less then 2 MB.");
    }
    updates.image = image;
    product.image !== "default.png" && deleteImage(product.image);
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { slug },
    updates,
    updateOptions
  );

  if (!updatedProduct) {
    throw createError(400, "Cannot update because this product is not exist.");
  }
  return updatedProduct;
};

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  deleteProductBySlug,
  updateProductBySlug,
};
