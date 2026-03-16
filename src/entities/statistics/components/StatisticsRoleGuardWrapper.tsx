"use client";

import { StatisticsContents } from "@entities/statistics/components";
import { ROLES } from "@shared/constants";
import { useAuthStore } from "@shared/store";

export function StatisticsRoleGuardWrapper() {
  const role = useAuthStore((s) => s.role);

  if (role !== ROLES.ADMIN) return null;

  return <StatisticsContents />;
}
