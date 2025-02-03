const express = require("express");
const router = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} = require("../handlers/category-handler");

// Add a new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const result = await addCategory({ name });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error adding category", details: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const result = await getCategories();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories", details: error.message });
  }
});

// Get a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCategoryById(id);

    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category", details: error.message });
  }
});

// Update an existing category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = req.body;

    if (!model.name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    await updateCategory(id, model);
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating category", details: error.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCategory(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category", details: error.message });
  }
});

module.exports = router;
