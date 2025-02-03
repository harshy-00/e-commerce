const express = require("express");
const {
  addBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getBrands,
} = require("../handlers/brand-handler");

const router = express.Router();

// Add a new brand
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    const result = await addBrand({ name });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error adding brand", details: error.message });
  }
});

// Update an existing brand
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = req.body;

    if (!model.name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    await updateBrand(id, model);
    res.json({ message: "Brand updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating brand", details: error.message });
  }
});

// Delete a brand
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await deleteBrand(id);
    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting brand", details: error.message });
  }
});

// Get a single brand by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrand(id);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: "Error fetching brand", details: error.message });
  }
});

// Get all brands
router.get("/", async (req, res) => {
  try {
    const brands = await getBrands();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Error fetching brands", details: error.message });
  }
});

module.exports = router;
