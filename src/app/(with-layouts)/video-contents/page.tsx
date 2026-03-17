import { Suspense } from "react";
import { AdminVideoContentsSection } from "@features/video-contents-manage/components";

export default function AdminVideoContentsPage() {
  return (
    <Suspense fallback={null}>
      <AdminVideoContentsSection />
    </Suspense>
  );
}
