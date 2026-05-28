const express = require("express");
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;