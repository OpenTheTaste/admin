import { Suspense } from "react";
import { MonitoringContents } from "@entities/monitoring/components";
import { MonitoringPageSkeleton } from "@entities/monitoring/components";
import { StatisticsRoleGuardWrapper } from "@entities/statistics/components";

export default function MonitoringPage() {
  return (
    <Suspense fallback={<MonitoringPageSkeleton />}>
      <MonitoringContents />
      <StatisticsRoleGuardWrapper />
    </Suspense>
  );
}
