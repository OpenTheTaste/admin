import { AdminShortsSection } from "@features/shorts-manage";
import { Suspense } from "react";

export default function AdminShortsPage() {
  return (
    <Suspense fallback={null}>
      {/*Pre-rendering 지금은 아무것도 없음*/}
      <AdminShortsSection />
    </Suspense>
  );
}
