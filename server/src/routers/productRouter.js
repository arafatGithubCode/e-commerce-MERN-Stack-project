const productRouter = require("express").Router();

const {
  handleCreateProduct,
  handleGetProducts,
} = require("../controllers/productController");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { uploadProductImage } = require("../middlewares/uploadFile");
const runValidation = require("../validators");
const { validateProduct } = require("../validators/product");

//POST: api/products -> create a product
productRouter.post(
  "/create-product",
  uploadProductImage.single("image"),
  validateProduct,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateProduct
);

//GET: api/products -> return all products
productRouter.get("/", handleGetProducts);

module.exports = { productRouter };
