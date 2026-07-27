import { IMember } from "@/interfaces/models/member.interfaces";
import { create } from "zustand";

interface AuthState {
  user: IMember | null;
  setUser: (user: IMember | null) => void;
  logout: () => void;
  authenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authenticated: false,
  loading: false,
  setUser: (user) => set({ user, authenticated: true }),

  logout: () => set({ user: null, authenticated: false }),

  setLoading: (loading) => set({ loading }),
}));
