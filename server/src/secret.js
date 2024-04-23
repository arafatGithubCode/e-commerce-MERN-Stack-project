require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;
const altasDB =
  process.env.ATLAS_DB || "mongodb://localhost:27017/e-commerceDB";

module.exports = { serverPort, altasDB };
