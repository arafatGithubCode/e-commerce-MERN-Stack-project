const multer = require("multer");
const path = require("path");

const { uploadDir } = require("../secret");

const uploadFile = uploadDir;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, uploadFile));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(extname, "") + extname
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
