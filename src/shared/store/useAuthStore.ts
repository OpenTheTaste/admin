import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@shared/types";

interface AuthState {
  memberId: number | null;
  role: Role | null;
  email: string | null;
  nickname: string | null;
  _hasHydrated: boolean;
  setAuth: (
    memberId: number,
    role: Role,
    email: string,
    nickname: string,
  ) => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      memberId: null,
      role: null,
      email: null,
      nickname: null,
      _hasHydrated: false,
      setAuth: (memberId, role, email, nickname) =>
        set({ memberId, role, email, nickname }),
      clearAuth: () =>
        set({ memberId: null, role: null, email: null, nickname: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        memberId: state.memberId,
        role: state.role,
        email: state.email,
        nickname: state.nickname,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
