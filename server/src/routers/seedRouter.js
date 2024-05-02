const express = require("express");
const seedRouter = express.Router();

const { seedUsers, seedProducts } = require("../controllers/seedController");
const {
  uploadUserImage,
  uploadProductImage,
} = require("../middlewares/uploadFile");

seedRouter.get("/users", uploadUserImage.single("image"), seedUsers);
seedRouter.get("/products", uploadProductImage.single("image"), seedProducts);

module.exports = { seedRouter };
