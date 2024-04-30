const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { createjsonWebToken } = require("../helper/jsonwebtoken");
const {
  jwtActivationKey,
  clientUrl,
  jwtResetPasswordKey,
} = require("../secret");
const emailWithNodeMailer = require("../helper/email");
const {
  findUsers,
  findUserByID,
  deleteUserByID,
  UpdateUserByID,
  userStatusAction,
  UpdateUserPasswordByID,
  forgetUserPasswordByEmail,
} = require("../services/userService");

const handleGetUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const { users, pagination } = await findUsers(search, limit, page);

    return successResponse(res, {
      statusCode: 200,
      message: "Users were returned successfully!",
      payload: {
        users,
        pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetUserByID = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const options = { password: 0 };
    const user = await findUserByID(userID, options);

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

const handleDeleteUserByID = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const options = { password: 0 };

    await deleteUserByID(userID, options);

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

const handleProcessRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const image = req.file?.path;

    if (!image) {
      throw createError(400, "Image file is required.");
    }

    if (image.size > 1024 * 1024 * 2) {
      throw createError(400, "File too large. It must be less then 2 MB.");
    }

    const userExist = await User.exists({ email: email });
    if (userExist) {
      throw createError(
        409,
        "User with this email already exist. Please sign in"
      );
    }

    //create jwt
    const tokenPayload = {
      name,
      email,
      password,
      phone,
      address,
    };
    if (image) {
      tokenPayload.image = image;
    }
    const token = createjsonWebToken(tokenPayload, jwtActivationKey, "10m");

    //prepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
        <h2> Hello ${name} !</h2>
        <p> Please click here to <a href="${clientUrl}/api/users/activate/${token}" target="_blank">active your account</a> </p>
      `,
    };

    // send email with nodemailer
    try {
      await emailWithNodeMailer(emailData);
    } catch (emailErr) {
      next(createError(500, "Failed to send verification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} to complete registration process`,
      payload: { token },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const handleActivateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) throw createError(404, "token not found!");

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(401, "Unable to verify user!");

      const userExist = await User.exists({ email: decoded.email });

      if (userExist) {
        throw createError(
          409,
          "User with this email already exist. Please sign in"
        );
      }

      await User.create(decoded);
      return successResponse(res, {
        statusCode: 200,
        message: "A user was registered successfully!",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has Expired!");
      } else if (error.name === "jsonWebTokenError") {
        throw createError(401, "Invalid token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "token founding error"));
      return;
    }
    next(error);
  }
};

const handleUpdateUserByID = async (req, res, next) => {
  try {
    const updatedUser = await UpdateUserByID(req);

    return successResponse(res, {
      statusCode: 200,
      message: "A user was updated successfully!",
      payload: updatedUser,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const handleManageUserStatusByID = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const action = req.body.action;

    const successMessage = await userStatusAction(userID, action);

    return successResponse(res, {
      statusCode: 200,
      message: successMessage,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const handleUpdatePassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    const userID = req.params.id;

    const updatedUser = await UpdateUserPasswordByID(
      userID,
      email,
      oldPassword,
      newPassword,
      confirmPassword
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User's password updated successfully!",
      payload: { updatedUser },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const token = await forgetUserPasswordByEmail(email);

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} to reset the password`,
      payload: { token },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User ID"));
      return;
    }
    next(error);
  }
};

module.exports = {
  handleGetUsers,
  handleGetUserByID,
  handleDeleteUserByID,
  handleProcessRegister,
  handleActivateUserAccount,
  handleUpdateUserByID,
  handleManageUserStatusByID,
  handleUpdatePassword,
  handleForgetPassword,
};
