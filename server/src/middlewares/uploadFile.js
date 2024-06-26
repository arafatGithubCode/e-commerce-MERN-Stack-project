const multer = require("multer");
const path = require("path");

const {
  UPLOAD_USER_IMG_DIRECTORY,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  UPLOAD_PRODUCT_IMG_DIRECTORY,
} = require("../config");

const UserStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, path.join(__dirname, UPLOAD_USER_IMG_DIRECTORY));
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const ProductStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, path.join(__dirname, UPLOAD_PRODUCT_IMG_DIRECTORY));
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error("This file type is not allowed."), false);
  }
  cb(null, true);
};

const uploadUserImage = multer({
  storage: UserStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

const uploadProductImage = multer({
  storage: ProductStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = { uploadUserImage, uploadProductImage };
