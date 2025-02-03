const express = require("express");
const router = express.Router();
const { getOrders, updateOrderStatus } = require("./../handlers/order-handler");

// Get all orders
router.get("", async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders", details: error.message });
  }
});

// Update order status
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    await updateOrderStatus(id, status);
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating order status", details: error.message });
  }
});

module.exports = router;
