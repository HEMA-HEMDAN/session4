const express = require("express");
const controler = require("../controler/products-controller");
const validationSchema = require("../middleWare/validationSchema");
const varifyToken = require("../middleWare/verifyToken");
const allowTo = require("../middleWare/allowTo");
const Router = express.Router();
Router.route("/")
  .get(controler.getProducts)
  .post(
    varifyToken,
    validationSchema,
    allowTo("admin", "manager"),
    controler.postProduct
  );
Router.route("/:id")
  .get(controler.getProductById)
  .put(varifyToken, allowTo("admin", "manager"), controler.putProduct)
  .delete(varifyToken, allowTo("admin", "manager"), controler.deleteProduct);

module.exports = Router;
