const express = require("express");

const app = express();
const port = 3000;

const products = (() => {
  try {
    return require("./data/product.json");
  } catch (error) {
    console.error("Error loading product.json:", error.message);
    return []; 
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`The express.js is running on port ${port}`);
});