const Wishlist = require("../db/wishlist");

// Add an item to the wishlist
async function addToWishlist(userId, productId) {
  try {
    const existingItem = await Wishlist.findOne({ userId, productId });

    if (existingItem) {
      throw new Error("Product already in wishlist");
    }

    const wishlist = new Wishlist({ userId, productId });
    await wishlist.save();

    return { message: "Product added to wishlist", wishlist: wishlist.toObject() };
  } catch (error) {
    throw new Error("Error adding to wishlist: " + error.message);
  }
}

// Remove an item from the wishlist
async function removeFromWishlist(userId, productId) {
  try {
    const deletedItem = await Wishlist.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      throw new Error("Product not found in wishlist");
    }

    return { message: "Product removed from wishlist" };
  } catch (error) {
    throw new Error("Error removing from wishlist: " + error.message);
  }
}

// Get all wishlist items for a user
async function getWishlist(userId) {
  try {
    const wishlistItems = await Wishlist.find({ userId }).populate("productId");

    if (wishlistItems.length === 0) {
      throw new Error("Wishlist is empty");
    }

    return wishlistItems.map((item) => item.productId.toObject());
  } catch (error) {
    throw new Error("Error fetching wishlist: " + error.message);
  }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
