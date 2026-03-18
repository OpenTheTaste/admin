import { Suspense } from "react";
import {
  AdminUserPageSkeleton,
  AdminUserSection,
} from "@entities/user/components";

export default function UserPage() {
  return (
    <Suspense fallback={<AdminUserPageSkeleton />}>
      <AdminUserSection />
    </Suspense>
  );
}
