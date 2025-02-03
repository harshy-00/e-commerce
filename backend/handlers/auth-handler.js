const User = require("../db/user"); // Fixed path formatting
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; // Use environment variable for security

// Function to register a new user
async function registerUser(model) {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: model.email });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(model.password, 10);

    // Create a new user
    const user = new User({
      name: model.name,
      email: model.email,
      password: hashedPassword,
    });

    await user.save();
    return { message: "User registered successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to login a user
async function loginUser(model) {
  try {
    const user = await User.findOne({ email: model.email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if the password is correct
    const isMatched = await bcrypt.compare(model.password, user.password);

    if (!isMatched) {
      throw new Error("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      SECRET_KEY,
      { expiresIn: "50h" }
    );

    return { token, user };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { registerUser, loginUser };
