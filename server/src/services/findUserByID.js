const mongoose = require("mongoose");
const User = require("../models/userModel");

const createError = require("http-errors");

const findUserByID = async (userID) => {
  try {
    const options = { password: 0 };
    const user = await User.findById(userID, options);

    if (!user) throw createError(404, "User does not exist with this ID");
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid User ID");
    }
    throw error;
  }
};

module.exports = { findUserByID };
