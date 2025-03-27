/*
const express = require("express");
const {
  validateGetProducts,
  validateGetProductById,
  validateDeleteProductById,
  validateCreateProduct,
  validateUpdateProduct,
} = require("../middlewares/products");
const {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} = require("../controllers/products");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetProducts, getProducts)
  .post(validateCreateProduct, createProduct);

router
  .route("/:id")
  .get(validateGetProductById, getProductById)
  .put(validateUpdateProduct, updateProduct)
  .delete(validateDeleteProductById, deleteProductById);

module.exports = router;
*/
