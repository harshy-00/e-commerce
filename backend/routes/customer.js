const express = require("express");
const {
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
  getProduct,
} = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("./../handlers/wishlist-handler");

const {
  getCartItems,
  addToCart,
  removefromCart,
  clearCart,
} = require("./../handlers/shopping-cart-handel");

const { getBrands } = require("../handlers/brand-handler");

const { addOrder, getCustomerOrders } = require("../handlers/order-handler");

const router = express.Router();

// Get new products
router.get("/new-products", async (req, res) => {
  try {
    const products = await getNewProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching new products", details: error.message });
  }
});

// Get featured products
router.get("/featured-products", async (req, res) => {
  try {
    const products = await getFeaturedProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching featured products", details: error.message });
  }
});

// Get categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories", details: error.message });
  }
});

// Get brands
router.get("/brands", async (req, res) => {
  try {
    const brands = await getBrands();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Error fetching brands", details: error.message });
  }
});

// Get products with filters
router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page } = req.query;

  try {
    const products = await getProductForListing(
      searchTerm,
      categoryId,
      page,
      pageSize,
      sortBy,
      sortOrder,
      brandId
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
});

// Get a single product by ID
router.get("/product/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const product = await getProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product", details: error.message });
  }
});

// Get wishlist
router.get("/wishlists", async (req, res) => {
  const userId = req.user.id;
  try {
    const items = await getWishlist(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist", details: error.message });
  }
});

// Add to wishlist
router.post("/wishlists/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  try {
    const item = await addToWishlist(userId, productId);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error adding to wishlist", details: error.message });
  }
});

// Remove from wishlist
router.delete("/wishlists/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  try {
    await removeFromWishlist(userId, productId);
    res.json({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error removing from wishlist", details: error.message });
  }
});

// Get cart items
router.get("/carts", async (req, res) => {
  const userId = req.user.id;
  try {
    const items = await getCartItems(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart items", details: error.message });
  }
});

// Add to cart
router.post("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const quantity = req.body.quantity;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    const items = await addToCart(userId, productId, quantity);
    res.status(201).json(items);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart", details: error.message });
  }
});

// Remove from cart
router.delete("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  try {
    await removefromCart(userId, productId);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error removing from cart", details: error.message });
  }
});

// Create an order
router.post("/order", async (req, res) => {
  const userId = req.user.id;
  const order = req.body;

  if (!order.items || order.items.length === 0) {
    return res.status(400).json({ error: "Order must have items" });
  }

  try {
    await addOrder(userId, order);
    await clearCart(userId);
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating order", details: error.message });
  }
});

// Get customer orders
router.get("/orders", async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await getCustomerOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders", details: error.message });
  }
});

module.exports = router;
