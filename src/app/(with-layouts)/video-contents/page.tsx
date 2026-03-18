import { Suspense } from "react";
import {
  AdminVideoContentsPageSkeleton,
  AdminVideoContentsSection,
} from "@features/video-contents-manage/components";

export default function AdminVideoContentsPage() {
  return (
    <Suspense fallback={<AdminVideoContentsPageSkeleton />}>
      <AdminVideoContentsSection />
    </Suspense>
  );
}
