"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Edit, Loader2 } from "lucide-react";
import { AdminShortsEditModal } from "@features/shorts-manage";
import { AdminShortsDetailModal } from "@entities/shorts/components";
import { useInfiniteShortsList } from "@entities/shorts/hooks";
import { AdminPublicBadge } from "@shared/components";
import { toPublicStatus } from "@shared/lib";
import { PublicType } from "@shared/types";

interface AdminShortsListProps {
  filterPublic?: PublicType | null;
  searchWord?: string;
}

export function AdminShortsList({
  filterPublic,
  searchWord,
}: AdminShortsListProps) {
  const { shortsList, observerRef, isLoading, isError, isFetchingNextPage } =
    useInfiniteShortsList({
      searchWord,
      publicStatus: toPublicStatus(filterPublic),
    });

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedId = searchParams.get("id");
  const action = searchParams.get("action");

  const selectedMediaId = selectedId ? Number(selectedId) : null;
  const hasSelectedMediaId =
    selectedMediaId !== null && Number.isFinite(selectedMediaId);

  const handleRowClick = (mediaId: number) => {
    router.push(`?id=${mediaId}`, { scroll: false });
  };

  const handleClose = () => {
    router.push("?", { scroll: false });
  };

  const handleEditClick = (mediaId: number) => {
    router.push(`?id=${mediaId}&action=edit`, { scroll: false });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

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
            {shortsList.map((short) => (
              <tr
                key={short.mediaId}
                onClick={() => handleRowClick(short.mediaId)}
                className="hover:bg-ot-gray-800/30 transition-colors"
              >
                <td className="py-3">
                  <div className="relative aspect-5/7 max-w-12 w-full mx-auto">
                    {short.posterUrl ? (
                      <Image
                        src={short.posterUrl}
                        alt={short.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full rounded-md bg-ot-gray-800 text-ot-gray-700">
                        <span className="text-xl font-bold">✕</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col font-semibold">
                    <span>{short.title}</span>
                  </div>
                </td>

                <td className="py-3 text-center">
                  <AdminPublicBadge
                    isPublic={short.publicStatus === "PUBLIC"}
                  />
                </td>
                <td className="py-3 text-center font-semibold text-sm">
                  {short.uploadedDate}
                </td>

                <td
                  className="py-3 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => handleEditClick(short.mediaId)}>
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

        {/* 무한스크롤 감지 타겟 */}
        <div ref={observerRef} className="py-4 flex justify-center">
          {isFetchingNextPage && (
            <Loader2 className="animate-spin text-ot-placeholder" size={20} />
          )}
        </div>
      </div>

      {action === "edit" && hasSelectedMediaId ? (
        <AdminShortsEditModal mediaId={selectedMediaId} onClose={handleClose} />
      ) : (
        hasSelectedMediaId && (
          <AdminShortsDetailModal
            mediaId={selectedMediaId}
            onClose={handleClose}
          />
        )
      )}
    </>
  );
}
