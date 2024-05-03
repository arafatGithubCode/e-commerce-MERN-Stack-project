const productRouter = require("express").Router();

const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleUpdateProduct,
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
//GET: api/products -> return a product
productRouter.get("/:slug", handleGetProduct);
//DELETE: api/products -> delete a product
productRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteProduct);
//PUT: api/products -> update a product
productRouter.put(
  "/:slug",
  uploadProductImage.single("image"),
  isLoggedIn,
  isAdmin,
  handleUpdateProduct
);

module.exports = { productRouter };
