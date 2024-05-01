const User = require("../models/userModel");

const checkUserExist = async (email) => {
  try {
    return await User.exists({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = checkUserExist;
