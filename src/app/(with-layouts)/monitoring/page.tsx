import { MonitoringContents } from "@entities/monitoring/components";
import { StatisticsRoleGuardWrapper } from "@entities/statistics/components";

export default function MonitoringPage() {
  return (
    <main className="flex flex-col">
      <MonitoringContents />
      <StatisticsRoleGuardWrapper />
    </main>
  );
}
