const mongoose = require("mongoose");
const { altasDB } = require("../secret");

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(altasDB, option);
    console.log("altasDB is connected!");
    mongoose.connection.on("error", (error) => {
      console.error("DB connection err: ", error);
    });
  } catch (error) {
    console.error("Could Not connect DB: ", error.toString());
  }
};

module.exports = connectDB;
