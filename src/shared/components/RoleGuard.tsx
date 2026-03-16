"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@shared/store";
import { Role } from "@shared/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: Role[];
  redirectTo?: string;
}

export function RoleGuard({
  children,
  allowedRole,
  redirectTo = "/shorts",
}: RoleGuardProps) {
  const role = useAuthStore((s) => s.role);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && role && !allowedRole.includes(role)) {
      router.replace(redirectTo);
    }
  }, [role, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-ot-placeholder text-sm">로딩 중...</p>
      </div>
    );
  }

  // role은 있는데 권한 없는 경우 에러처리
  if (!role || !allowedRole.includes(role)) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <p className="text-ot-text font-semibold">접근 권한이 없습니다.</p>
        <p className="text-ot-placeholder text-sm">
          해당 페이지에 접근할 수 없습니다.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
