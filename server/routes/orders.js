import express from 'express';
import { orders } from '../data/orders.js';
import { users } from '../data/users.js';

const router = express.Router();

// Get user orders
router.get('/', (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

// Create new order
router.post('/', (req, res) => {
  try {
    const { items, total } = req.body;
    const pointsEarned = Math.floor(total);

    const newOrder = {
      id: Date.now().toString(),
      userId: req.user.id,
      items,
      status: 'pending',
      total,
      pointsEarned,
      createdAt: new Date(),
    };

    // Add order to orders array
    orders.push(newOrder);

    // Update user points
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex !== -1) {
      users[userIndex].points += pointsEarned;
    }

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orders[orderIndex].status = status;
    res.json(orders[orderIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as ordersRouter };