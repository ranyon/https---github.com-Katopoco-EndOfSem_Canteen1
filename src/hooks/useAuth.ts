import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User } from '../types';

interface StoredUser extends User {
  password: string;
}

export function useAuth() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const getStoredUsers = (): StoredUser[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const storeUser = (user: StoredUser) => {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const users = getStoredUsers();
      const user = users.find(u => u.email === credentials.email);

      if (!user || user.password !== credentials.password) {
        return { success: false, error: 'Invalid email or password' };
      }

      const { password, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      navigate('/menu');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData: any) => {
    try {
      const users = getStoredUsers();
      const existingUser = users.find(u => u.email === userData.email);

      if (existingUser) {
        return { success: false, error: 'Email already exists' };
      }

      const newUser: StoredUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        points: 0,
        preferences: userData.preferences,
      };

      storeUser(newUser);

      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      navigate('/menu');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return { user, login, register, logout };
}