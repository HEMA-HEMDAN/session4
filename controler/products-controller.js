const { validationResult } = require("express-validator");
const productModel = require("../models/products.model");

const getProducts = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const products = await productModel
      .find({}, { _id: false, __v: false })
      .limit(limit)
      .skip((page - 1) * limit);
    res.json({ status: "ok", data: { products } });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error getting products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", msg: "product not found" });
    }
    res.json({ status: "ok", data: product });
  } catch (error) {
    res.status(400).json({ status: "error", msg: "invalid id" });
  }
};

const postProduct = async (req, res) => {
  const product = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }
  try {
    const newProduct = new productModel(product);
    await newProduct.save();
    res.json({ status: "ok", data: { product: newProduct } });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error creating product" });
  }
};

const putProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", msg: "product not found" });
    }
    res.json({ status: "ok", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", msg: "product not found" });
    }
    res.json({ status: "ok", msg: "product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
