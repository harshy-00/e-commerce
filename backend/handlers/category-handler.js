const Category = require("../db/category"); // Fixed path formatting

// Add a new category
async function addCategory(model) {
  try {
    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ name: model.name });
    if (existingCategory) {
      throw new Error("Category with this name already exists");
    }

    const category = new Category({ name: model.name });
    await category.save();
    return category.toObject();
  } catch (error) {
    throw new Error("Error adding category: " + error.message);
  }
}

// Get all categories
async function getCategories() {
  try {
    const categories = await Category.find();
    return categories.map((c) => c.toObject());
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
}

// Get a category by ID
async function getCategoryById(id) {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category.toObject();
  } catch (error) {
    throw new Error("Error fetching category: " + error.message);
  }
}

// Update a category
async function updateCategory(id, model) {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, model, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return updatedCategory.toObject();
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
}

// Delete a category
async function deleteCategory(id) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    return { message: "Category deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting category: " + error.message);
  }
}

module.exports = { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById };
