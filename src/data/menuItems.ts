import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Jollof Rice with Chicken',
    description: 'Spicy and flavorful rice cooked in tomato sauce, served with grilled chicken and plantains',
    price: 45.99,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1664993101841-036f189719b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nutrition: {
      calories: 750,
      protein: 38,
      carbs: 85,
      fat: 24
    },
    customization: [
      {
        name: 'Add-ons',
        options: [
          { id: 'extra-chicken', name: 'Extra Chicken', price: 15.00 },
          { id: 'extra-plantain', name: 'Extra Plantain', price: 8.00 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Waakye Special',
    description: 'Rice and beans cooked with millet leaves, served with fish, egg, and shito',
    price: 38.99,
    category: 'Main Dishes',
    image: 'https://cdn-images-1.medium.com/max/800/1*JPi7ModQBUsUmL-Mxq64UA.jpeg',
    nutrition: {
      calories: 680,
      protein: 32,
      carbs: 78,
      fat: 26
    },
    customization: [
      {
        name: 'Protein Choice',
        options: [
          { id: 'fish', name: 'Grilled Fish', price: 12.00 },
          { id: 'beef', name: 'Beef', price: 15.00 }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Banku with Tilapia',
    description: 'Fermented corn and cassava dough served with grilled tilapia and pepper sauce',
    price: 52.99,
    category: 'Main Dishes',
    image: 'https://th.bing.com/th/id/R.6467fb525c9ea54669dcea20d24c8f2e?rik=3GqinQZyRP6Sww&pid=ImgRaw&r=0',
    nutrition: {
      calories: 720,
      protein: 42,
      carbs: 65,
      fat: 30
    },
    customization: [
      {
        name: 'Extras',
        options: [
          { id: 'extra-fish', name: 'Extra Tilapia', price: 20.00 },
          { id: 'extra-pepper', name: 'Extra Pepper Sauce', price: 5.00 }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Fufu with Light Soup',
    description: 'Pounded cassava and plantain with spicy light soup and goat meat',
    price: 42.99,
    category: 'Soups',
    image: 'https://th.bing.com/th/id/OIP.CSGKL8FetlNkGh_hV3w6SwAAAA?rs=1&pid=ImgDetMain',
    nutrition: {
      calories: 580,
      protein: 35,
      carbs: 70,
      fat: 18
    },
    customization: [
      {
        name: 'Meat Choice',
        options: [
          { id: 'goat', name: 'Extra Goat Meat', price: 18.00 },
          { id: 'cow-feet', name: 'Add Cow Feet', price: 15.00 }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Kelewele Special',
    description: 'Spiced and diced ripe plantains with roasted peanuts',
    price: 25.99,
    category: 'Snacks',
    image: 'https://th.bing.com/th/id/OIP._aj47CVeOoBK86lh0CjK6wHaEL?rs=1&pid=ImgDetMain',
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 45,
      fat: 16
    },
    customization: [
      {
        name: 'Add-ons',
        options: [
          { id: 'extra-peanuts', name: 'Extra Peanuts', price: 5.00 },
          { id: 'spicy', name: 'Extra Spicy', price: 3.00 }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Red Red',
    description: 'Bean stew with fried plantains and gari',
    price: 35.99,
    category: 'Main Dishes',
    image: 'https://th.bing.com/th/id/OIP.PUlmzpDzmRgrgfD-tNBcygHaE7?rs=1&pid=ImgDetMain',
    nutrition: {
      calories: 550,
      protein: 24,
      carbs: 82,
      fat: 12
    },
    customization: [
      {
        name: 'Extras',
        options: [
          { id: 'extra-plantain', name: 'Extra Plantain', price: 8.00 },
          { id: 'extra-gari', name: 'Extra Gari', price: 4.00 }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Tuo Zaafi',
    description: 'Corn flour pudding served with ayoyo soup and beef',
    price: 40.99,
    category: 'Main Dishes',
    image: 'https://th.bing.com/th/id/OIP.jQU4SwetqBAfSVgmEx__rwHaHa?rs=1&pid=ImgDetMain',
    nutrition: {
      calories: 620,
      protein: 28,
      carbs: 85,
      fat: 20
    },
    customization: [
      {
        name: 'Meat Options',
        options: [
          { id: 'extra-beef', name: 'Extra Beef', price: 15.00 },
          { id: 'dried-fish', name: 'Add Dried Fish', price: 10.00 }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Kenkey with Fish',
    description: 'Fermented corn dough with fried fish and pepper sauce',
    price: 32.99,
    category: 'Main Dishes',
    image: 'https://th.bing.com/th/id/OIP.JrXXPOycLsvuxHFab28kuwHaHa?rs=1&pid=ImgDetMain',
    nutrition: {
      calories: 540,
      protein: 32,
      carbs: 68,
      fat: 15
    },
    customization: [
      {
        name: 'Add-ons',
        options: [
          { id: 'extra-fish', name: 'Extra Fish', price: 12.00 },
          { id: 'shito', name: 'Add Shito', price: 5.00 }
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'Yam Chips with Chicken',
    description: 'Crispy fried yam chips with grilled chicken and pepper sauce',
    price: 28.99,
    category: 'Snacks',
    image: 'https://corksghana.com/wp-content/uploads/2022/12/ad5a5a28-1594-495c-8833-3acdc6ffd032.jpeg',
    nutrition: {
      calories: 480,
      protein: 22,
      carbs: 58,
      fat: 20
    },
    customization: [
      {
        name: 'Extras',
        options: [
          { id: 'extra-chips', name: 'Extra Chips', price: 10.00 },
          { id: 'extra-sauce', name: 'Extra Sauce', price: 5.00 }
        ]
      }
    ]
  }
];