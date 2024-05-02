const productRouter = require("express").Router();

const { handleCreateProduct } = require("../controllers/productController");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const uploadUserImage = require("../middlewares/uploadFile");
const runValidation = require("../validators");
const { validateProduct } = require("../validators/product");

//POST: api/products
productRouter.post(
  "/create-product",
  uploadUserImage.single("image"),
  validateProduct,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateProduct
);

module.exports = { productRouter };
