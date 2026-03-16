import { Role } from "@shared/types";

export const ROLES: Record<string, Role> = {
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
} as const;
