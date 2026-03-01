"use client";

import { AdminSearch } from "@shared/components";
import { type UserType } from "@shared/mocks/mockAdminUsers";
import { useState } from "react";
import { AdminUserContents } from "@entities/user/components";

const ROLE_OPTIONS = ["전체사용자", "사용자", "관리자", "에디터"];

export default function AdminUserSection() {
  const [filterRole, setFilterRole] = useState<UserType | null>(null);

  const handleSelect = (option: string) => {
    setFilterRole(option === "전체사용자" ? null : (option as UserType));
  };

  return (
    <>
      <AdminSearch
        placeholder="이름 또는 이메일을 검색하세요."
        options={ROLE_OPTIONS}
        onSelect={handleSelect}
      />
      <AdminUserContents filterRole={filterRole} />
    </>
  );
}
