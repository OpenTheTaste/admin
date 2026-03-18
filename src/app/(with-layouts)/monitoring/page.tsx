import { Suspense } from "react";
import {
  MonitoringContents,
  MonitoringPageSkeleton,
} from "@entities/monitoring/components";
import { StatisticsRoleGuardWrapper } from "@entities/statistics/components";

export default function MonitoringPage() {
  return (
    <main className="flex flex-col">
      <Suspense fallback={<MonitoringPageSkeleton />}>
        <MonitoringContents />
        <StatisticsRoleGuardWrapper />
      </Suspense>
    </main>
  );
}