const createError = require("http-errors");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const { deleteImage } = require("../helper/deleteImage");
const User = require("../models/userModel");

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
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid ID");
    }
    throw error;
  }
};

const findUserByID = async (id, options = {}) => {
  try {
    const user = await User.findById(id, options);
    if (!user) {
      throw createError(404, "this user is not found.");
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid ID");
    }
    throw error;
  }
};

const deleteUserByID = async (userID, options = {}) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: userID,
      isAdmin: false,
    });
    if (!user) {
      throw createError(404, "this user is not found.");
    }
    if (user && user.image) {
      await deleteImage(user.image);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid ID");
    }
    throw error;
  }
};

const UpdateUserByID = async (req) => {
  try {
    const userID = req.params.id;
    const options = { password: 0 };
    const user = await findUserByID(userID, options);

    const updateOptions = { new: true, runValidators: true, context: "query" };

    let updates = {};

    //best practice
    for (let key in req.body) {
      if (["name", "password", "address", "phone"].includes(key)) {
        updates[key] = req.body[key];
      } else if (["email"].includes(key)) {
        throw createError(400, "Email cannot be updated");
      }
    }

    const image = req.file?.path;

    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(400, "File too large. It must be less then 2 MB.");
      }
      updates.image = image;
      user.image !== "avatar.png" && deleteImage(user.image);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      updates,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(
        400,
        "Cannot update because user with this ID is not exist."
      );
    }
    return updatedUser;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid ID");
    }
    throw error;
  }
};

const UpdateUserPasswordByID = async (
  userID,
  email,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404, "User is not found with this email.");
    }

    if (user.email !== email) {
      throw createError(404, "Email didn't match. Please enter correct email.");
    }

    if (newPassword !== confirmPassword) {
      throw createError(404, "New password and confirm password didn't match.");
    }

    // compare the password
    const isPasswordMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Old password didn't match");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { password: newPassword },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      throw createError(400, "User's password cannot updated successfully.");
    }
    return updatedUser;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid ID");
    }
    throw error;
  }
};

const userStatusAction = async (userID, action) => {
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
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid ID");
    }
    throw error;
  }
};

module.exports = {
  findUsers,
  findUserByID,
  deleteUserByID,
  UpdateUserByID,
  userStatusAction,
  UpdateUserPasswordByID,
};
