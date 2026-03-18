import { Suspense } from "react";
import { AdminSeriesSection } from "@features/series-manage/components";
import { AdminSeriesPageSkeleton } from "@entities/series/components";

export default function SeriesPage() {
  return (
    <Suspense fallback={<AdminSeriesPageSkeleton />}>
      <AdminSeriesSection />
    </Suspense>
  );
}
