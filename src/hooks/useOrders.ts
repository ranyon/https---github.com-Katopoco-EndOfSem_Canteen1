import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ordersAPI } from '../services/api';
import { Order } from '../types';

export function useOrders() {
  const { user, orders, placeOrder: storePlaceOrder } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await ordersAPI.getOrders();
      // Update store with fetched orders
    } catch (error) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const order = storePlaceOrder();
      if (order) {
        await ordersAPI.createOrder(order);
        await fetchOrders();
      }
      return { success: true };
    } catch (error) {
      setError('Failed to place order');
      return { success: false, error: 'Failed to place order' };
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, placeOrder };
}