import { Suspense } from "react";
import { AdminShortsSection } from "@features/shorts-manage";

export default function AdminShortsPage() {
  return (
    <Suspense fallback={null}>
      <AdminShortsSection />
    </Suspense>
  );
}
