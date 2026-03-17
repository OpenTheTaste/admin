"use client";

import { useState } from "react";
import { AdminUserContents } from "@entities/user/components";
import { AdminSearch } from "@shared/components";

const ROLE_OPTIONS = ["전체 사용자", "사용자", "관리자", "에디터", "중지됨"];

const ROLE_OPTION_TO_API: Record<string, string | undefined> = {
  전체사용자: undefined,
  사용자: "MEMBER",
  관리자: "ADMIN",
  에디터: "EDITOR",
  중지됨: "SUSPENDED",
};

export function AdminUserSection() {
  const [searchWord, setSearchWord] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);

  const handleSelect = (option: string) => {
    setRole(ROLE_OPTION_TO_API[option]);
  };

  return (
    <>
      <AdminSearch
        placeholder="이름 또는 이메일을 검색하세요."
        options={ROLE_OPTIONS}
        onSubmitSearch={(value) => setSearchWord(value || undefined)}
        onSelect={handleSelect}
      />
      <AdminUserContents searchWord={searchWord} role={role} />
    </>
  );
}
