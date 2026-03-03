"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AdminVideoContentsList } from "@features/video-contents-manage/components";
import { AdminSearch } from "@shared/components";
import { PublicType } from "@shared/types";

const PUBLIC_FILTER_OPTIONS = ["전체", "공개", "비공개"] as const;

export function AdminVideoContentsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";
  const filter = (searchParams.get("filter") as PublicType) ?? null;

  const push = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <AdminSearch
        placeholder="콘텐츠 제목을 입력하세요."
        options={[...PUBLIC_FILTER_OPTIONS]}
        defaultValue={keyword}
        onSubmitSearch={(value) =>
          push("keyword", value.replace(/\s/g, "") || null)
        }
        onSelect={(option) => push("filter", option === "전체" ? null : option)}
      />
      <AdminVideoContentsList filterPublic={filter} searchWord={keyword} />
    </>
  );
}
