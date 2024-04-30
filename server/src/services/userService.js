const User = require("../models/userModel");
const createError = require("http-errors");

const handleUserAction = async (userID, action) => {
  try {
    const user = await User.findOne({ _id: userID });

    let update;
    let successMessage;
    if (action === "ban") {
      if (user.isBanned) {
        throw createError(400, "This user already has been banned");
      }
      update = { isBanned: true };
      successMessage = "This user has been banned successfully";
    } else if (action === "unban") {
      if (!user.isBanned) {
        throw createError(400, "This user already has been unbanned");
      }
      update = { isBanned: false };
      successMessage = "This user has been unbanned successfully";
    } else {
      successMessage = "Use ban or unban to manage user status";
      throw createError(400, "Invalid Action. Use ban or unban");
    }
    const updateOptions = { new: true, runValidators: true, context: "query" };

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      update,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(400, `User cannot be ${action} successfully.`);
    }
    return successMessage;
  } catch (error) {
    throw error;
  }
};

module.exports = { handleUserAction };
