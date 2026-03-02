"use client";

import { AdminPublicBadge, AdminPublicToggle } from "@shared/components";

export interface AdminPublicStatusProps {
  isPublic: boolean;
  onChange: (value: boolean) => void;
}

export function AdminPublicStatus({
  isPublic,
  onChange,
}: AdminPublicStatusProps) {
  return (
    <div>
      <p className="font-semibold text-lg mb-2">공개 여부</p>
      <div className="flex items-center text-ot-gray-600 text-xs">
        <AdminPublicToggle
          isOn={isPublic}
          onToggle={(next) => onChange(next)}
        />
        {isPublic ? (
          <>
            <AdminPublicBadge
              context="modal"
              isPublic={true}
              className="ml-3 mr-2"
            />
            <p>모든 사용자가 볼 수 있습니다</p>
          </>
        ) : (
          <>
            <AdminPublicBadge
              context="modal"
              isPublic={false}
              className="ml-3 mr-2"
            />
            <p>영상이 숨김 처리 됩니다</p>
          </>
        )}
      </div>
    </div>
  );
}
