const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secret"; // Use environment variable for security

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY); // Remove "Bearer " prefix if present
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Middleware to check if user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden. Admin access required." });
  }
}

module.exports = { verifyToken, isAdmin };
