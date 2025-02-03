const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the product schema with validation and additional options
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"], // Makes name field mandatory
      unique: true, // Ensures product names are unique
      trim: true, // Removes unnecessary whitespace from the name
      minlength: [3, "Product name must be at least 3 characters long"], // Minimum length validation
      maxlength: [100, "Product name cannot exceed 100 characters"], // Maximum length validation
    },
    shortDescription: {
      type: String,
      maxlength: [150, "Short description cannot exceed 150 characters"], // Maximum length validation
    },
    description: {
      type: String,
      required: [true, "Product description is required"], // Makes description mandatory
      minlength: [10, "Product description must be at least 10 characters long"], // Minimum length validation
    },
    price: {
      type: Number,
      required: [true, "Product price is required"], // Makes price field mandatory
      min: [0, "Price must be a positive number"], // Ensures price is a positive number
    },
    discount: {
      type: Number,
      min: [0, "Discount must be at least 0%"], // Ensures discount is non-negative
      max: [100, "Discount cannot exceed 100%"], // Ensures discount doesn't exceed 100%
      default: 0, // Default discount is 0 if not provided
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: (v) => v.length > 0, // Ensures at least one image is provided
        message: "At least one image is required",
      },
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories", // Reference to the "categories" collection
      required: [true, "Category ID is required"], // Makes categoryId mandatory
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "brands", // Reference to the "brands" collection
      required: [true, "Brand ID is required"], // Makes brandId mandatory
    },
    isFeatured: {
      type: Boolean,
      default: false, // Default to false if not provided
    },
    isNewProduct: {
      type: Boolean,
      default: true, // Default to true for new products
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const Product = mongoose.model("Product", productSchema);

// Export the model for use in other files
module.exports = Product;
