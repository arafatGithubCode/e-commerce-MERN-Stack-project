const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { createjsonWebToken } = require("../helper/jsonwebtoken");
const { jwtAccessKey } = require("../secret");

const handleLogin = async (req, res, next) => {
  try {
    // email, password req.body
    const { email, password } = req.body;

    // isExist with email
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User does not exist with this email. Please register first."
      );
    }
    // compare the password
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Bad user credential");
    }
    // isBanned
    if (user.isBanned) {
      throw createError(402, "You are banned. Please contact authority.");
    }
    // token, cookie
    const accessToken = createjsonWebToken(
      { _id: user._id },
      jwtAccessKey,
      "10m"
    );
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "A user was logged in successfully!",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "A user was logged out successfully!",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin, handleLogout };
