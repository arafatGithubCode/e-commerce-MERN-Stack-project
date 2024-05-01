const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { createjsonWebToken } = require("../helper/jsonwebtoken");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../helper/cookie");

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
    const accessToken = createjsonWebToken({ user }, jwtAccessKey, "15m");
    setAccessTokenCookie(res, accessToken);

    // refreshToken, cookie
    const refreshToken = createjsonWebToken({ user }, jwtRefreshKey, "7d");
    setRefreshTokenCookie(res, refreshToken);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "A user was logged in successfully!",
      payload: { userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
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

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    //verify the old refresh token
    const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
    if (!decodedToken) {
      throw createError(404, "Invalid refresh token. Please log in.");
    }

    // new access token generate
    const accessToken = createjsonWebToken(
      decodedToken.user,
      jwtAccessKey,
      "15m"
    );
    setAccessTokenCookie(res, accessToken);
    return successResponse(res, {
      statusCode: 200,
      message: "A new access token is generated.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    //verify the old refresh token
    const decodedToken = jwt.verify(accessToken, jwtAccessKey);

    if (!decodedToken) {
      throw createError(404, "Invalid refresh token. Please log in.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Protected resources accessed successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtectedRoute,
};
