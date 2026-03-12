"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AdminSeriesContents } from "@features/series-manage/components";
import { AdminSearch } from "@shared/components";

export function AdminSeriesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";

  const push = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <AdminSearch
        placeholder="시리즈 제목을 입력해주세요."
        defaultValue={keyword}
        onSubmitSearch={(value) => push("keyword", value || null)}
      />
      <AdminSeriesContents searchWord={keyword} />
    </>
  );
}
