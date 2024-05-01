const mongoose = require("mongoose");

const { altasDB } = require("../secret");
const logger = require("../controllers/loggerController");

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(altasDB, option);
    logger.log("info", "altasDB is connected!");
    mongoose.connection.on("error", (error) => {
      logger.error("error", "DB connection err: ", error);
    });
  } catch (error) {
    logger.error("error", "Could Not connect DB: ", error.toString());
  }
};

module.exports = connectDB;
