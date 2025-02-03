const Cart = require("../db/cart"); // Fixed path formatting

// Add or update cart item
async function addToCart(userId, productId, quantity) {
  try {
    const product = await Cart.findOne({ userId, productId });

    if (product) {
      if (product.quantity + quantity <= 0) {
        await removeFromCart(userId, productId);
      } else {
        await Cart.findByIdAndUpdate(product._id, { quantity: product.quantity + quantity }, { new: true });
      }
    } else {
      const newProduct = new Cart({ userId, productId, quantity });
      await newProduct.save();
    }

    return { message: "Cart updated successfully" };
  } catch (error) {
    throw new Error("Error updating cart: " + error.message);
  }
}

// Remove an item from the cart
async function removeFromCart(userId, productId) {
  try {
    const deletedItem = await Cart.findOneAndDelete({ userId, productId });
    if (!deletedItem) {
      throw new Error("Item not found in cart");
    }
    return { message: "Item removed from cart" };
  } catch (error) {
    throw new Error("Error removing item from cart: " + error.message);
  }
}

// Get all cart items for a user
async function getCartItems(userId) {
  try {
    const cartItems = await Cart.find({ userId }).populate("productId");
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }
    
    return cartItems.map((item) => ({
      quantity: item.quantity,
      product: item.productId.toObject(),
    }));
  } catch (error) {
    throw new Error("Error fetching cart items: " + error.message);
  }
}

// Clear the cart for a user
async function clearCart(userId) {
  try {
    await Cart.deleteMany({ userId });
    return { message: "Cart cleared successfully" };
  } catch (error) {
    throw new Error("Error clearing cart: " + error.message);
  }
}

module.exports = { getCartItems, addToCart, removeFromCart, clearCart };
