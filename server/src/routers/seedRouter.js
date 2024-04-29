const express = require("express");
const seedRouter = express.Router();

const { seedUsers } = require("../controllers/seedController");
const uploadUserImage = require("../middlewares/uploadFile");

seedRouter.get("/users", uploadUserImage.single("image"), seedUsers);

module.exports = { seedRouter };
