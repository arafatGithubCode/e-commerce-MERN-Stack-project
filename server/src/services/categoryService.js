const slugify = require("slugify");
const createError = require("http-errors");

const Category = require("../models/categoryModel");
const checkCategoryExist = require("../helper/checkCategoryExist");

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name,
    slug: slugify(name),
  });

  return newCategory;
};

const getCategories = async () => {
  return await Category.find({}).select("name slug").lean();
};

const getCategory = async (slug) => {
  const result = await checkCategoryExist(slug);
  if (!result) {
    throw createError(400, `This ${slug} category is not exist.`);
  }
  return await Category.find({ slug }).select("name slug").lean();
};

const updateCategory = async (name, slug) => {
  const result = await checkCategoryExist(slug);
  if (!result) {
    throw createError(400, `This ${slug} category is not exist.`);
  }

  const filter = { slug };
  const updates = { $set: { name: name, slug: slugify(name) } };
  const options = { new: true };

  const updatedCategory = await Category.findOneAndUpdate(
    filter,
    updates,
    options
  );
  return updatedCategory;
};

const deleteCategory = async (slug) => {
  const result = await checkCategoryExist(slug);
  if (!result) {
    throw createError(400, `This ${slug} category is not exist.`);
  }

  return await Category.findOneAndDelete(slug);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
