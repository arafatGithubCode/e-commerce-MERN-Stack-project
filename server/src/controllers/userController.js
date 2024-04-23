const getUser = (req, res, next) => {
  try {
    res.status(200).send({
      message: "User is returned!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };
