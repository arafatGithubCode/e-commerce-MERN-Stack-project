require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;

const altasDB =
  process.env.ATLAS_DB || "mongodb://localhost:27017/e-commerceDB";

const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE_PATH || "./public/images/users/avatar.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "sdlkfjskdltkijd55";

module.exports = { serverPort, altasDB, defaultUserImage, jwtActivationKey };
