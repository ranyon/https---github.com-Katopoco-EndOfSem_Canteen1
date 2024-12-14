export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  customization?: {
    name: string;
    options: {
      id: string;
      name: string;
      price: number;
    }[];
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  points: number;
  preferences: {
    dietaryRestrictions: string[];
    allergies: string[];
  };
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations: Record<string, string>;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  total: number;
  pointsEarned: number;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';