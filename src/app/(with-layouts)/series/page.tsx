import { Suspense } from "react";
import {
  AdminSeriesPageSkeleton,
  AdminSeriesSection,
} from "@features/series-manage/components";

export default function SeriesPage() {
  return (
    <Suspense fallback={<AdminSeriesPageSkeleton />}>
      <AdminSeriesSection />
    </Suspense>
  );
}
