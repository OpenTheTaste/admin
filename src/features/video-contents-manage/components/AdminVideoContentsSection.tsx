"use client";

import { AdminSearch } from "@shared/components";
import { AdminVideoContentsList } from "@features/video-contents-manage/components";
import { useState } from "react";
import { PublicType } from "@shared/types/admin";

const PUBLIC_FILTER_OPTIONS = ["전체", "공개", "비공개"] as const;

export default function AdminVideoContentsSection() {
  const [filterPublic, setFilterPublic] = useState<PublicType | null>(null);

  const handleSelect = (option: string) => {
    setFilterPublic(option === "전체" ? null : (option as PublicType));
  };

  return (
    <>
      <AdminSearch
        placeholder="콘텐츠 제목을 입력하세요."
        options={[...PUBLIC_FILTER_OPTIONS]}
        onSelect={handleSelect}
      />

      <AdminVideoContentsList filterPublic={filterPublic} />
    </>
  );
}
