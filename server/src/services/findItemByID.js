const mongoose = require("mongoose");

const createError = require("http-errors");

const findItemByID = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);

    if (!item)
      throw createError(404, `${Model.modelName} does not exist with this ID`);
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid User ID");
    }
    throw error;
  }
};

module.exports = { findItemByID };
