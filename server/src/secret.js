require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;

const altasDB =
  process.env.ATLAS_DB || "mongodb://localhost:27017/e-commerceDB";

const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE_PATH || "./public/images/users/avatar.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "sdlkfjskdltkijd55";

const smtpUsername = process.env.SMTP_USERNAME || "";

const smtpPassword = process.env.SMTP_PASSWORD || "";

const clientUrl = process.env.CLIENT_URL || "";

const uploadDir = process.env.UPLOAD_DIR || "./public/images/users";

module.exports = {
  serverPort,
  altasDB,
  defaultUserImage,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
  uploadDir,
};
