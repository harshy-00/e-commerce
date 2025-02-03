const mongoose = require("mongoose");

// Define the order schema with validation and additional options
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the "users" collection
      required: [true, "User ID is required"], // Makes userId mandatory
    },
    date: {
      type: Date,
      default: Date.now, // Default to the current date if not provided
    },
    items: {
      type: [mongoose.Schema.Types.Mixed], // Array of mixed data types (could be product details, etc.)
      required: [true, "Order items are required"], // Makes the items field mandatory
    },
    paymentType: {
      type: String,
      required: [true, "Payment type is required"], // Makes paymentType mandatory
      enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"], // List of accepted payment methods
    },
    address: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Shipping address is required"], // Makes address mandatory
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Possible order statuses
      default: "Pending", // Default status is "Pending"
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const Order = mongoose.model("Order", orderSchema);

// Export the model for use in other files
module.exports = Order;
