import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, User, MenuItem, Order } from '../types';

interface Store {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  setUser: (user: User | null) => void;
  addToCart: (menuItem: MenuItem, quantity: number, customizations: Record<string, string>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  placeOrder: (pointsUsed?: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  redeemPoints: (points: number) => void;
  logout: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      orders: [],
      setUser: (user) => set({ user }),
      addToCart: (menuItem, quantity, customizations) => {
        set((state) => ({
          cart: [...state.cart, { menuItem, quantity, customizations }],
        }));
      },
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.menuItem.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.menuItem.id === itemId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          const customizationTotal = Object.values(item.customizations).reduce(
            (acc, optionId) => {
              const option = item.menuItem.customization?.find((c) =>
                c.options.some((o) => o.id === optionId)
              )?.options.find((o) => o.id === optionId);
              return acc + (option?.price || 0);
            },
            0
          );
          return total + (item.menuItem.price + customizationTotal) * item.quantity;
        }, 0);
      },
      placeOrder: (pointsUsed = 0) => {
        const { user, cart, getCartTotal } = get();
        if (!user || cart.length === 0) return;

        const subtotal = getCartTotal();
        const discount = (pointsUsed / 100) * 10;
        const total = Math.max(0, subtotal - discount);
        const pointsEarned = Math.floor(total);

        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          items: [...cart],
          status: 'pending',
          total,
          pointsEarned,
          createdAt: new Date(),
        };

        // Update user points in local storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((u: any) =>
          u.id === user.id
            ? { ...u, points: u.points - pointsUsed + pointsEarned }
            : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        set((state) => ({
          orders: [...state.orders, newOrder],
          cart: [],
          user: state.user
            ? { ...state.user, points: state.user.points - pointsUsed + pointsEarned }
            : null,
        }));

        return newOrder;
      },
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),
      redeemPoints: (points) => {
        set((state) => {
          if (!state.user) return state;

          // Update user points in local storage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map((u: any) =>
            u.id === state.user?.id
              ? { ...u, points: u.points - points }
              : u
          );
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          return {
            user: { ...state.user, points: state.user.points - points },
          };
        });
      },
      logout: () => set({ user: null, cart: [], orders: [] }),
    }),
    {
      name: 'canteen-storage',
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        orders: state.orders,
      }),
    }
  )
);