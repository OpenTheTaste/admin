import { AdminVideoContentsSection } from "@features/video-contents-manage/components";
import { Suspense } from "react";

export default function AdminVideoContentsPage() {
  return (
    <Suspense fallback={null}>
      {" "}
      {/*Pre-rendering 지금은 아무것도 없음*/}
      <AdminVideoContentsSection />
    </Suspense>
  );
}
