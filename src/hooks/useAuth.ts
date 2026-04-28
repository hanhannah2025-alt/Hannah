'use client';

import { useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  stats: {
    follow: number;
    likes: number;
    favorites: number;
  };
  isVerified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);

    const handleStorageChange = () => {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };
}
