import { Suspense } from "react";
import { AdminVideoContentsSection } from "@features/video-contents-manage/components";
import { AdminVideoContentsPageSkeleton } from "@entities/video-contents/components";

export default function AdminVideoContentsPage() {
  return (
    <Suspense fallback={<AdminVideoContentsPageSkeleton />}>
      <AdminVideoContentsSection />
    </Suspense>
  );
}
