import { Suspense } from "react";
import { AdminSeriesSection } from "@features/series-manage/components";

export default function SeriesPage() {
  return (
    <Suspense fallback={null}>
      <AdminSeriesSection />
    </Suspense>
  );
}
