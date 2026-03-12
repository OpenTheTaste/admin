"use client";

import { useState } from "react";
import { type UserType } from "@/entities/user/types/user";
import { AdminChangeRoleModal } from "@features/user-manage/components";
import { MemberListItem } from "@entities/user/apis";
import { useInfiniteMemberList } from "@entities/user/hooks";
import { AdminBadge } from "@shared/components";

const ROLE_TO_USER_TYPE: Record<string, UserType> = {
  ADMIN: "관리자",
  MEMBER: "사용자",
  EDITOR: "에디터",
  SUSPENDED: "중지됨",
};

const TYPE_STYLE_MAP: Record<UserType, string> = {
  관리자: "bg-ot-primary-500 text-ot-text",
  사용자: "bg-ot-primary-400 text-ot-text",
  에디터: "bg-ot-primary-200 text-ot-background",
  중지됨: "bg-ot-gray-900 text-ot-text",
};

interface AdminUserContentsProps {
  searchWord?: string;
  role?: string;
}

export function AdminUserContents({
  searchWord,
  role,
}: AdminUserContentsProps) {
  const { memberList, observerRef, isLoading } = useInfiniteMemberList({
    searchWord,
    role,
  });
  const [selectedMember, setSelectedMember] = useState<MemberListItem | null>(
    null,
  );

  const isRoleChangeable = (memberRole: string) =>
    memberRole === "EDITOR" || memberRole === "SUSPENDED";

  return (
    <div className="mt-4">
      <div className="rounded-lg overflow-hidden">
        <table className="w-full text-ot-text">
          <colgroup>
            <col className="w-2/9" />
            <col className="w-3/9" />
            <col className="w-2/9" />
            <col className="w-2/9" />
          </colgroup>

          <thead className="bg-ot-gray-800 text-md font-bold">
            <tr>
              <th className="py-3">이름</th>
              <th>이메일</th>
              <th>역할</th>
              <th>가입일</th>
            </tr>
          </thead>

          <tbody className="bg-ot-gray-700 divide-y divide-ot-gray-800">
            {memberList.map((member) => {
              const userType = ROLE_TO_USER_TYPE[member.role] ?? "사용자";
              return (
                <tr
                  key={member.memberId}
                  className="hover:bg-ot-gray-700/30 transition-colors"
                >
                  <td className="py-5 text-center">
                    <div className="flex flex-col font-semibold">
                      <span>{member.nickname}</span>
                    </div>
                  </td>

                  <td className="py-5 text-center">{member.email}</td>

                  <td className="py-5 text-center">
                    {isRoleChangeable(member.role) ? (
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="cursor-pointer"
                      >
                        <AdminBadge
                          variant={userType}
                          className={`${TYPE_STYLE_MAP[userType]} hover:opacity-80 transition-opacity`}
                        />
                      </button>
                    ) : (
                      <AdminBadge
                        variant={userType}
                        className={TYPE_STYLE_MAP[userType]}
                      />
                    )}
                  </td>

                  <td className="py-5 text-center font-semibold text-sm">
                    {member.createdDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!isLoading && memberList.length === 0 && (
        <div className="py-16 text-center text-ot-placeholder text-sm">
          검색 결과가 없습니다.
        </div>
      )}
      <div ref={observerRef} />

      {selectedMember && (
        <AdminChangeRoleModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
