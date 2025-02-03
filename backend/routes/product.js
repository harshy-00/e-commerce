const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../handlers/product-handler");
const router = express.Router();

// Add a new product
router.post("/", async (req, res) => {
  const model = req.body;

  // Basic validation for required fields
  if (!model.name || !model.price || !model.categoryId) {
    return res.status(400).json({ error: "Missing required fields: name, price, categoryId" });
  }

  try {
    const product = await addProduct(model);
    res.status(201).json(product); // Return the created product with status 201
  } catch (error) {
    res.status(500).json({ error: "Error adding product", details: error.message });
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  const model = req.body;
  const id = req.params.id;

  // Basic validation for required fields
  if (!model.name && !model.price && !model.categoryId) {
    return res.status(400).json({ error: "At least one field (name, price, or categoryId) must be provided" });
  }

  try {
    await updateProduct(id, model);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating product", details: error.message });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product", details: error.message });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await getProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product", details: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
});

module.exports = router;
