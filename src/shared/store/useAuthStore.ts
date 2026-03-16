import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@shared/types";

interface AuthState {
  memberId: number | null;
  role: Role | null;
  email: string | null;
  nickname: string | null;
  setAuth: (
    memberId: number,
    role: Role,
    email: string,
    nickname: string,
  ) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      memberId: null,
      role: null,
      email: null,
      nickname: null,
      setAuth: (memberId, role, email, nickname) =>
        set({ memberId, role, email, nickname }),
      clearAuth: () =>
        set({ memberId: null, role: null, email: null, nickname: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        memberId: state.memberId,
        role: state.role,
      }),
    },
  ),
);
