"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Edit, Loader2 } from "lucide-react";
import { AdminSeriesEditModal } from "@features/series-manage/components";
import { CategoryBadge } from "@entities/category/components";
import { useCategories } from "@entities/category/hooks";
import { AdminSeriesDetailModal } from "@entities/series/components";
import { useInfiniteSeriesList } from "@entities/series/hooks";
import { TagBadge } from "@entities/tag/components";
import { AdminPublicBadge } from "@shared/components";

interface AdminSeriesContentsProps {
  searchWord?: string;
}

export function AdminSeriesContents({ searchWord }: AdminSeriesContentsProps) {
  const { seriesList, observerRef, isLoading, isError, isFetchingNextPage } =
    useInfiniteSeriesList({ searchWord });

  const { data: categories } = useCategories();

  const getCategoryId = (categoryName: string): number | null => {
    return (
      categories?.find((c) => c.categoryName === categoryName)?.categoryId ??
      null
    );
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedId = searchParams.get("id");
  const action = searchParams.get("action");

  const selectedMediaId = selectedId ? Number(selectedId) : null;
  const hasSelectedMediaId =
    selectedMediaId !== null && Number.isFinite(selectedMediaId);

  const selectedSeries = hasSelectedMediaId
    ? (seriesList.find((s) => s.mediaId === selectedMediaId) ?? null)
    : null;

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
            {seriesList.map((content) => {
              const categoryId = getCategoryId(content.categoryName);
              return (
                <tr
                  key={content.mediaId}
                  onClick={() => handleRowClick(content.mediaId)}
                  className="hover:bg-ot-gray-800/30 transition-colors cursor-pointer"
                >
                  <td className="py-3">
                    <div className="relative aspect-5/7 max-w-12 w-full mx-auto">
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
                    <div className="flex justify-center">
                      {categoryId !== null && (
                        <CategoryBadge
                          category={categoryId}
                          label={content.categoryName}
                        />
                      )}
                    </div>
                  </td>

                  <td className="py-3 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {categoryId !== null &&
                        content.tagNameList.map((tag) => (
                          <TagBadge
                            key={tag}
                            label={tag}
                            category={categoryId}
                          />
                        ))}
                    </div>
                  </td>

                  <td className="py-3 text-center">
                    <AdminPublicBadge
                      isPublic={content.publicStatus === "PUBLIC"}
                    />
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
              );
            })}
          </tbody>
        </table>
        {!isLoading && seriesList.length === 0 && (
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
        <AdminSeriesEditModal
          series={selectedSeries}
          onClose={handleClose}
          onUpdate={handleClose}
        />
      ) : (
        hasSelectedMediaId && (
          <AdminSeriesDetailModal
            mediaId={selectedMediaId!}
            onClose={handleClose}
          />
        )
      )}
    </>
  );
}
