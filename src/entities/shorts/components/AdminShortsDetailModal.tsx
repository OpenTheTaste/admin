"use client";

import Image from "next/image";
import { Bookmark, X } from "lucide-react";
import { CategoryBadge } from "@entities/category/components";
import { useCategories } from "@entities/category/hooks";
import { useShortsDetail } from "@entities/shorts/hooks";
import { TagBadge } from "@entities/tag/components";
import { AdminPublicBadge } from "@shared/components";
import { formatSize } from "@shared/lib";

interface AdminShortsDetailModalProps {
  mediaId: number;
  onClose: () => void;
}

export function AdminShortsDetailModal({
  mediaId,
  onClose,
}: AdminShortsDetailModalProps) {
  const { data, isLoading, isError } = useShortsDetail(mediaId);
  const { data: categories } = useCategories();

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>에러</div>;

  const categoryId =
    categories?.find((c) => c.categoryName === data.categoryName)?.categoryId ??
    null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-ot-text rounded-lg w-full max-w-2xl mx-4 p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-8 text-ot-background">
          <p className="text-2xl font-bold">숏폼 상세정보</p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* 썸네일 */}
        {/* 메인 그리드: 썸네일 좌 / 메타 우 */}
        <section className="grid grid-cols-2 gap-x-10 text-ot-background">
          {/* 좌측: 썸네일 */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">썸네일 (5:7)</p>
            <div className="relative max-w-60 aspect-5/7 rounded-lg overflow-hidden">
              {data.posterUrl ? (
                <>
                  <Image
                    src={data.posterUrl}
                    alt={data.title}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div
                    className="w-full h-full rounded-md bg-ot-gray-800"
                    aria-label="썸네일 없음"
                  />
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full rounded-md bg-ot-gray-800 text-ot-gray-700">
                  <span className="text-xl font-bold">✕</span>
                </div>
              )}
            </div>
          </div>

          {/* 우측: 메타 정보 */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-semibold">제목</p>
              <p className="text-sm">{data.title}</p>
            </div>

            <div>
              <p className="text-base font-semibold">설명</p>
              <p className="text-sm leading-relaxed">{data.description}</p>
            </div>

            <div>
              <p className="text-base font-semibold">원본 콘텐츠</p>
              <p className="text-sm">{data.originContentsTitle}</p>
            </div>

            <div>
              <p className="text-base font-semibold">업로더</p>
              <p className="text-sm">{data.uploaderNickname}</p>
            </div>

            {/* 재생 시간 | 파일 크기 */}
            <div className="grid grid-cols-2">
              <div>
                <p className="text-base font-semibold">재생 시간</p>
                <p className="text-sm">{data.duration}</p>
              </div>
              <div>
                <p className="text-base font-semibold">파일 크기</p>
                <p className="text-sm">{formatSize(data.videoSize)}</p>
              </div>
            </div>

            {/* 카테고리 | 태그 */}
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">카테고리</p>
                <div className="flex items-center">
                  {categoryId && (
                    <CategoryBadge
                      category={categoryId}
                      label={data.categoryName}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">태그</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {categoryId &&
                    data.tagNameList.map((tagName) => (
                      <TagBadge
                        key={tagName}
                        label={tagName}
                        category={categoryId}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* 공개 여부 */}
            <div>
              <p className="text-base font-semibold mb-0.5">공개 여부</p>
              <AdminPublicBadge
                context="modal"
                isPublic={data.publicStatus === "PUBLIC"}
              />
            </div>

            {/* 북마크 | 업로드 일자 */}
            <div className="grid grid-cols-2">
              <div>
                <p className="text-base font-semibold">북마크</p>
                <p className="text-sm flex items-center gap-1">
                  <Bookmark size={14} />
                  {data.bookmarkCount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-base font-semibold">업로드 일자</p>
                <p className="text-sm">{data.uploadedDate}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
