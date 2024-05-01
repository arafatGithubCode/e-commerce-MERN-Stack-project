const slugify = require("slugify");

const Category = require("../models/categoryModel");

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name,
    slug: slugify(name),
  });

  return newCategory;
};

module.exports = { createCategory };
