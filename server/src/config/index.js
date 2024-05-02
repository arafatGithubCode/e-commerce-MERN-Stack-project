const UPLOAD_USER_IMG_DIRECTORY = "../public/images/users";
const UPLOAD_PRODUCT_IMG_DIRECTORY = "../public/images/products";
const MAX_FILE_SIZE = 2097152; //2MB
const ALLOWED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

module.exports = {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  UPLOAD_USER_IMG_DIRECTORY,
  UPLOAD_PRODUCT_IMG_DIRECTORY,
};
