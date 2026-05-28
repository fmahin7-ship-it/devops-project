const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/products.json");



// Read products
const getProducts = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};



// Save products
const saveProducts = (products) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(products, null, 2)
  );
};



// GET all products
router.get("/", (req, res) => {
  const products = getProducts();

  res.status(200).json(products);
});



// GET single product
router.get("/:id", (req, res) => {
  const products = getProducts();

  const product = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.status(200).json(product);
});



// POST new product
router.post("/", (req, res) => {
  const products = getProducts();

  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock
  };

  products.push(newProduct);

  saveProducts(products);

  res.status(201).json(newProduct);
});



// PUT update product
router.put("/:id", (req, res) => {
  const products = getProducts();

  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products[productIndex] = {
    ...products[productIndex],
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock
  };

  saveProducts(products);

  res.status(200).json(products[productIndex]);
});



// DELETE product
router.delete("/:id", (req, res) => {
  let products = getProducts();

  const productExists = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!productExists) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products = products.filter(
    (p) => p.id !== parseInt(req.params.id)
  );

  saveProducts(products);

  res.status(200).json({
    message: "Product deleted successfully"
  });
});

module.exports = router;