const createError = require("http-errors");

const emailWithNodeMailer = require("./email");

const sendEmail = async (emailData, mailErrMessage) => {
  try {
    await emailWithNodeMailer(emailData);
  } catch (emailErr) {
    throw createError(500, mailErrMessage);
  }
};

module.exports = sendEmail;
