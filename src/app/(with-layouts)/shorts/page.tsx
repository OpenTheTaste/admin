import { Suspense } from "react";
import {
  AdminShortsPageSkeleton,
  AdminShortsSection,
} from "@features/shorts-manage";

export default function AdminShortsPage() {
  return (
    <Suspense fallback={<AdminShortsPageSkeleton />}>
      <AdminShortsSection />
    </Suspense>
  );
}
