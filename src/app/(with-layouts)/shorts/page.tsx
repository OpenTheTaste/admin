import { Suspense } from "react";
import { AdminShortsSection } from "@features/shorts-manage";
import { AdminShortsPageSkeleton } from "@entities/shorts/components";

export default function AdminShortsPage() {
  return (
    <Suspense fallback={<AdminShortsPageSkeleton />}>
      <AdminShortsSection />
    </Suspense>
  );
}
