const mongoose = require("mongoose");

// Define the schema with validation and additional options
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"], // Makes the name field mandatory
      unique: true, // Ensures no duplicate brand names
      trim: true, // Removes unnecessary whitespace from the name
      minlength: [2, "Brand name must be at least 2 characters long"], // Minimum length validation
      maxlength: [50, "Brand name cannot exceed 50 characters"], // Maximum length validation
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const Brand = mongoose.model("Brand", brandSchema);

// Export the model for use in other files
module.exports = Brand;
