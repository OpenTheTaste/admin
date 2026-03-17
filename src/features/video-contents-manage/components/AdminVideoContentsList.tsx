"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Edit, Loader2 } from "lucide-react";
import { AdminVideoContentsEditModal } from "@features/video-contents-manage/components";
import "@entities/video-contents/apis";
import { AdminVideoContentsDetailModal } from "@entities/video-contents/components";
import { useInfiniteContentList } from "@entities/video-contents/hooks";
import { AdminPublicBadge } from "@shared/components";
import { toPublicStatus } from "@shared/lib";
import { PublicType } from "@shared/types";

interface AdminVideoContentsListProps {
  filterPublic?: PublicType | null;
  searchWord?: string;
}

export function AdminVideoContentsList({
  filterPublic,
  searchWord,
}: AdminVideoContentsListProps) {
  const { contentList, observerRef, isLoading, isError, isFetchingNextPage } =
    useInfiniteContentList({
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
      <div className="mt-4">
        <div className="rounded-lg overflow-hidden">
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
              {contentList.map((content) => (
                <tr
                  key={content.mediaId}
                  onClick={() => handleRowClick(content.mediaId)}
                  className="hover:bg-ot-gray-800/30 transition-colors cursor-pointer"
                >
                  <td className="py-3">
                    <div className="relative aspect-4/3 max-w-22 w-full mx-auto">
                      {content.thumbnailUrl ? (
                        <Image
                          src={content.thumbnailUrl}
                          alt={content.title}
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
                  <td className="py-3 text-center">
                    <div className="flex flex-col font-semibold">
                      <span>{content.title}</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <AdminPublicBadge
                      isPublic={content.publicStatus === "PUBLIC"}
                    />
                  </td>
                  <td className="py-3 text-center font-semibold text-sm">
                    {content.uploadedDate}
                  </td>
                  <td
                    className="py-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button onClick={() => handleEditClick(content.mediaId)}>
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
        {!isLoading && contentList.length === 0 && (
          <div className="py-16 text-center text-ot-placeholder text-sm">
            검색 결과가 없습니다.
          </div>
        )}
        {/* 무한스크롤 감지 타겟 */}
        <div ref={observerRef} className="py-4 flex justify-center">
          {isFetchingNextPage && (
            <Loader2 className="animate-spin text-ot-placeholder" size={20} />
          )}
        </div>
      </div>

      {action === "edit" && hasSelectedMediaId ? (
        <AdminVideoContentsEditModal
          mediaId={selectedMediaId}
          onClose={handleClose}
        />
      ) : (
        hasSelectedMediaId && (
          <AdminVideoContentsDetailModal
            mediaId={selectedMediaId}
            onClose={handleClose}
          />
        )
      )}
    </>
  );
}
