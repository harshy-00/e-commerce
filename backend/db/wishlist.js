const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the wishlist schema with validation and additional options
const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the "users" collection
      required: [true, "User ID is required"], // Makes userId mandatory
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products", // Reference to the "products" collection
      required: [true, "Product ID is required"], // Makes productId mandatory
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const Wishlist = mongoose.model("Wishlist", wishListSchema);

// Export the model for use in other files
module.exports = Wishlist;
