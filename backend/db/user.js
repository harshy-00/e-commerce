const mongoose = require("mongoose");

// Define the user schema with validation and additional options
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"], // Makes name field mandatory
      minlength: [3, "User name must be at least 3 characters long"], // Minimum length validation
      maxlength: [100, "User name cannot exceed 100 characters"], // Maximum length validation
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Makes email field mandatory
      unique: true, // Ensures email is unique across users
      lowercase: true, // Automatically converts email to lowercase
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Validates the email format
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Makes password field mandatory
      minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default to false if not provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field (version key)
  }
);

// Create a Mongoose model
const User = mongoose.model("User", userSchema);

// Export the model for use in other files
module.exports = User;
