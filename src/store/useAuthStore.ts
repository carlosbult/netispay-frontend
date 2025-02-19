'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: number;
  token: string | null;
  role: string | null;
  setUserId: (userId: number) => void;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userId: 0,
      token: null,
      role: null,
      setUserId: (userId) => {
        set({ userId });
      },
      setToken: (token) => {
        set({ token });
      },
      setRole: (role) => {
        set({ role });
      },
      clearAuth: () => {
        set({ token: null, userId: 0, role: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
