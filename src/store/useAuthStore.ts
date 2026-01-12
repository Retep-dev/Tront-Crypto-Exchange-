import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    token: null,
    login: (user, token) => set({ user, isAuthenticated: true, token }),
    logout: () => set({ user: null, isAuthenticated: false, token: null }),
}));
