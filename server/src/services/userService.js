const User = require("../models/userModel");
const createError = require("http-errors");

const findUsers = async (search, limit, page) => {
  try {
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users) throw createError(404, "No users found!");

    const totalPages = Math.ceil(count / limit);
    const previousPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 <= Math.ceil(count / limit) ? page + 1 : null;

    return {
      users,
      pagination: {
        totalPages,
        currentPage: page,
        previousPage,
        nextPage,
      },
    };
  } catch (error) {
    throw error;
  }
};

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

module.exports = { findUsers, handleUserAction };
