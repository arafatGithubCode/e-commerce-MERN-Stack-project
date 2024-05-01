require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;

const altasDB =
  process.env.ATLAS_DB || "mongodb://localhost:27017/e-commerceDB";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "sdlkfjskdltkijd55";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "DFDLKFJLSKDJFLKSDJFLKS";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "DFDLKFJLSKDJFLKSDJFLKS";
const jwtResetPasswordKey =
  process.env.JWT_RESET_PASSWORD_KEY || "DFDLKFJLSKDJFLKSDJFLKS254";

const smtpUsername = process.env.SMTP_USERNAME || "";

const smtpPassword = process.env.SMTP_PASSWORD || "";

const clientUrl = process.env.CLIENT_URL || "";

const defaultUserImage = "./public/images/users/avatar.png";

module.exports = {
  serverPort,
  altasDB,
  jwtActivationKey,
  jwtAccessKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
  defaultUserImage,
  jwtResetPasswordKey,
  jwtRefreshKey,
};
