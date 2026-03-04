"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Edit } from "lucide-react";
import { AdminShortsEditModal } from "@features/shorts-manage";
import { AdminShortsDetailModal } from "@entities/shorts/components";
import { AdminPublicBadge } from "@shared/components";
import { ShortsType, mockAdminShorts } from "@shared/mocks/mockAdminShorts";
import { PublicType } from "@shared/types";

interface AdminShortsListProps {
  filterPublic?: PublicType | null;
}

export function AdminShortsList({ filterPublic }: AdminShortsListProps) {
  const [data, setData] = useState<ShortsType[]>(mockAdminShorts);

  const filteredData = filterPublic
    ? data.filter((short) =>
        filterPublic === "공개" ? short.isPublic : !short.isPublic,
      )
    : data;

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedId = searchParams.get("id");
  const action = searchParams.get("action");

  const selectedshorts = selectedId
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

  const handleUpdate = (updated: ShortsType) => {
    setData((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    handleClose();
  };

  return (
    <>
      <div className="mt-4 rounded-lg overflow-hidden">
        <table className="w-full text-ot-text">
          <colgroup>
            <col className="w-1/9" />
            <col className="w-5/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
          </colgroup>

          <thead className="bg-ot-gray-800 text-md font-bold">
            <tr>
              <th className="py-3">썸네일</th>
              <th>제목</th>
              <th>공개 여부</th>
              <th>업로드일</th>
              <th>수정</th>
            </tr>
          </thead>

          <tbody className="bg-ot-gray-700 divide-y divide-ot-gray-800">
            {filteredData.map((short) => (
              <tr
                key={short.id}
                onClick={() => handleRowClick(short.id)}
                className="hover:bg-ot-gray-800/30 transition-colors"
              >
                <td className="py-3">
                  <div className="relative aspect-5/7 max-w-12 w-full mx-auto">
                    {short.thumbnailUrl ? (
                      <Image
                        src={short.thumbnailUrl}
                        alt={short.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-md bg-ot-gray-800"
                        aria-label="썸네일 없음"
                      />
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col font-semibold">
                    <span>{short.title}</span>
                    <span className="text-sm text-ot-placeholder mt-1">
                      {short.duration}
                    </span>
                  </div>
                </td>

                <td className="py-3 text-center">
                  <AdminPublicBadge isPublic={short.isPublic ? true : false} />
                </td>
                <td className="py-3 text-center font-semibold text-sm">
                  {short.uploadDate}
                </td>

                <td
                  className="py-3 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => handleEditClick(short.id)}>
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
      {action === "edit" && selectedshorts ? (
        <AdminShortsEditModal
          shorts={selectedshorts}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      ) : (
        selectedshorts && (
          <AdminShortsDetailModal
            shorts={selectedshorts}
            onClose={handleClose}
          />
        )
      )}
    </>
  );
}
