const User = require("../models/userModel");

const createError = require("http-errors");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findItemByID } = require("../services/findItemByID");
const { deleteImage } = require("../helper/deleteImage");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

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

    return successResponse(res, {
      statusCode: 200,
      message: "Users were returned successfully!",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const options = { password: 0 };
    const user = await findItemByID(User, userID, options);

    return successResponse(res, {
      statusCode: 200,
      message: "A user was returned successfully!",
      payload: { user },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const deleteUserByID = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const options = { password: 0 };

    const user = await findItemByID(User, userID, options);

    const userImagePath = user.image;
    deleteImage(userImagePath);

    await User.findByIdAndDelete({
      _id: userID,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "A user was deleted successfully!",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userExist = await User.exists({ email: email });

    if (userExist) {
      throw createError(
        409,
        "User with this email already exist. Please sign in"
      );
    }

    const newUser = {
      name,
      email,
      password,
      phone,
      address,
    };

    return successResponse(res, {
      statusCode: 200,
      message: "A user was created successfully!",
      payload: { newUser },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

module.exports = { getUsers, getUserByID, deleteUserByID, processRegister };
