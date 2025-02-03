const mongoose = require("mongoose");

// Define the cart schema with validation and additional options
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the "users" collection
      required: [true, "User ID is required"], // Makes the userId field mandatory
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products", // Reference to the "products" collection
      required: [true, "Product ID is required"], // Makes the productId field mandatory
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"], // Makes the quantity field mandatory
      min: [1, "Quantity must be at least 1"], // Minimum value for quantity
      default: 1, // Default quantity if not provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const Cart = mongoose.model("Cart", cartSchema);

// Export the model for use in other files
module.exports = Cart;
