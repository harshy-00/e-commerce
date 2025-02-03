const Order = require("../db/order"); // Fixed path formatting

// Add a new order
async function addOrder(userId, orderModel) {
  try {
    const order = new Order({
      ...orderModel,
      userId: userId,
      status: "inprogress",
    });

    await order.save();
    return order.toObject();
  } catch (error) {
    throw new Error("Error adding order: " + error.message);
  }
}

// Get orders for a specific customer
async function getCustomerOrders(userId) {
  try {
    const orders = await Order.find({ userId });
    if (orders.length === 0) {
      throw new Error("No orders found for this user");
    }
    return orders.map((order) => order.toObject());
  } catch (error) {
    throw new Error("Error fetching customer orders: " + error.message);
  }
}

// Get all orders
async function getOrders() {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      throw new Error("No orders found");
    }
    return orders.map((order) => order.toObject());
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
}

// Update order status
async function updateOrderStatus(id, status) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      throw new Error("Order not found");
    }

    return updatedOrder.toObject();
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
}

module.exports = { addOrder, getCustomerOrders, getOrders, updateOrderStatus };
