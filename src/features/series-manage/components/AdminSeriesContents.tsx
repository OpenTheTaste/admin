"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Edit } from "lucide-react";
import { AdminSeriesEditModal } from "@features/series-manage/components";
import { AdminSeriesDetailModal } from "@entities/series/components";
import { AdminBadge } from "@shared/components";
import { AdminSeries, mockAdminSeries } from "@shared/mocks/mockAdminSeries";
import { cn } from "@shared/utils";

export function AdminSeriesContents() {
  const [data, setData] = useState<AdminSeries[]>(mockAdminSeries);
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedId = searchParams?.get("id");
  const action = searchParams?.get("action");

  const selectedSeries = selectedId
    ? (data.find((s) => s.id === Number(selectedId)) ?? null)
    : null;

  const handleRowClick = (id: number) => {
    router.push(`?id=${id}`, { scroll: false });
  };

  const handleClose = () => {
    router.push("?", { scroll: false });
  };

  const handleEditClick = (id: number) => {
    router.push(`?id=${id}&action=edit`, { scroll: false });
  };

  const handleUpdate = (updated: AdminSeries) => {
    setData((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    handleClose();
  };

  return (
    <>
      <div className="mt-4 rounded-lg overflow-hidden">
        <table className="w-full text-ot-text">
          <colgroup>
            <col className="w-1/9" />
            <col className="w-4/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
          </colgroup>

          <thead className="bg-ot-gray-800 text-md font-bold">
            <tr>
              <th className="py-3">썸네일</th>
              <th>시리즈 제목</th>
              <th>카테고리</th>
              <th>태그</th>
              <th>공개 여부</th>
              <th>수정</th>
            </tr>
          </thead>

          <tbody className="bg-ot-gray-700 divide-y divide-ot-gray-800">
            {data.map((content) => (
              <tr
                key={content.id}
                onClick={() => handleRowClick(content.id)}
                className="hover:bg-ot-gray-800/30 transition-colors cursor-pointer"
              >
                <td className="py-3">
                  <div className="relative aspect-5/7 max-w-12 w-full mx-auto">
                    <Image
                      src={content.thumbnailVertical}
                      alt={content.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </td>

                <td className="py-3 text-center">
                  <div className="flex flex-col font-semibold">
                    <span>{content.title}</span>
                  </div>
                </td>

                <td className="py-3 text-center">
                  <span
                  // className={cn(
                  //   badgeBase,
                  //   CATEGORY_STYLE_MAP[content.category],
                  // )}
                  >
                    {content.category}
                  </span>
                </td>

                <td className="py-3 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        // className={cn(
                        //   badgeBase,
                        //   TAG_STYLE_MAP[tag] ?? "bg-ot-gray-600 text-ot-text",
                        // )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-3 text-center">
                  <AdminBadge variant={content.isPublic ? "공개" : "비공개"} />
                </td>

                <td
                  className="py-3 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => handleEditClick(content.id)}>
                    <Edit
                      size={20}
                      className="hover:stroke-ot-gray-600 cursor-pointer"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {action === "edit" && selectedSeries ? (
        <AdminSeriesEditModal
          series={selectedSeries}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      ) : (
        selectedSeries && (
          <AdminSeriesDetailModal
            series={selectedSeries}
            onClose={handleClose}
          />
        )
      )}
    </>
  );
}
