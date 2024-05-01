const Category = require("../models/categoryModel");

const checkCategoryExist = async (slug) => {
  try {
    return await Category.exists({ slug });
  } catch (error) {
    throw error;
  }
};

module.exports = checkCategoryExist;
