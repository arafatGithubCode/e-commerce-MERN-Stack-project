const cloudinary = require("cloudinary").v2;

const {
  cloudinaryName,
  cloudinaryApiKey,
  cloudinarySecretKey,
} = require("../secret");

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinarySecretKey,
});

module.exports = cloudinary;
