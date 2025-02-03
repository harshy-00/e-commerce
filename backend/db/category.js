const mongoose = require("mongoose");

// Define the category schema with validation and additional options
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"], // Makes the name field mandatory
      unique: true, // Ensures category name is unique
      trim: true, // Removes unnecessary whitespace from the name
      minlength: [3, "Category name must be at least 3 characters long"], // Minimum length validation
      maxlength: [50, "Category name cannot exceed 50 characters"], // Maximum length validation
    },
    description: {
      type: String,
      trim: true, // Removes unnecessary whitespace from the description
      maxlength: [200, "Description cannot exceed 200 characters"], // Maximum length validation
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories", // Reference to the "categories" collection (for subcategories)
      default: null, // Default value is null if it's not a subcategory
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const Category = mongoose.model("Category", categorySchema);

// Export the model for use in other files
module.exports = Category;
