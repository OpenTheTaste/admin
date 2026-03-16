import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@shared/types";

interface AuthState {
  memberId: number | null;
  role: Role | null;
  setAuth: (memberId: number, role: Role) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      memberId: null,
      role: null,
      setAuth: (memberId, role) => set({ memberId, role }),
      clearAuth: () => set({ memberId: null, role: null }),
    }),
    { name: "auth-storage" },
  ),
);
