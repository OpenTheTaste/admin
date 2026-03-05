"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { CommonButton } from "@shared/components";
import { useChangeRole } from "@entities/user/hooks";
import { MemberListItem } from "@entities/user/apis";

interface AdminChangeRoleModalProps {
  member: MemberListItem;
  onClose: () => void;
}

const ROLE_LABEL: Record<string, string> = {
  EDITOR: "에디터",
  SUSPENDED: "중지됨",
};

const ROLE_STYLE: Record<string, string> = {
  EDITOR: "bg-ot-primary-200 text-ot-background",
  SUSPENDED: "bg-ot-gray-900 text-ot-text",
};

export function AdminChangeRoleModal({ member, onClose }: AdminChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<"EDITOR" | "SUSPENDED">(
    member.role === "EDITOR" ? "SUSPENDED" : "EDITOR",
  );
  const [mounted, setMounted] = useState(false);
  const { mutate: changeRole, isPending } = useChangeRole();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = () => {
    changeRole(
      { memberId: member.memberId, params: { role: selectedRole } },
      { onSuccess: onClose },
    );
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-96 bg-ot-text rounded-lg py-6 px-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="relative mb-6 text-ot-background">
          <p className="text-xl font-bold">사용자 역할 변경</p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* 사용자 정보 */}
        <div className="mb-6 p-3 bg-ot-gray-100 rounded-lg text-ot-background text-sm">
          <p className="font-semibold text-base">{member.nickname}</p>
          <p className="text-ot-gray-600 mt-0.5">{member.email}</p>
        </div>

        {/* 역할 선택 */}
        <div className="mb-6 text-ot-background">
          <p className="text-sm font-semibold mb-3">변경할 역할을 선택하세요</p>
          <div className="grid grid-cols-2 gap-3">
            {(["EDITOR", "SUSPENDED"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`py-3 rounded-lg text-sm font-semibold border-2 transition-all cursor-pointer ${
                  selectedRole === role
                    ? `${ROLE_STYLE[role]} border-transparent`
                    : "bg-transparent border-ot-gray-300 text-ot-gray-500 hover:border-ot-gray-400"
                }`}
              >
                {ROLE_LABEL[role]}
              </button>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <CommonButton
            type="button"
            onClick={onClose}
            className="py-3 font-semibold"
            variant="outline"
          >
            취소
          </CommonButton>
          <CommonButton
            type="button"
            onClick={handleSubmit}
            className="py-3 font-semibold"
            disabled={isPending}
          >
            {isPending ? "변경 중..." : "변경 완료"}
          </CommonButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
