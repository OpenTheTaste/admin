// /monitoring
import { MonitoringContents } from "@entities/monitoring/components";
import { StatisticsContents } from "@entities/statistics/components";

export default function MonitoringPage() {
  return (
    <main className="flex flex-col">
      <MonitoringContents />
      <StatisticsContents />
    </main>
  );
}
