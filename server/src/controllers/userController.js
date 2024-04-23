const { users } = require("../models/userModel");

const getUser = (req, res, next) => {
  try {
    res.status(200).send({
      message: "User is returned!",
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };
