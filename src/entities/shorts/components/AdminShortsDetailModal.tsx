"use client";

import Image from "next/image";
import { Bookmark, X } from "lucide-react";
import { CategoryBadge } from "@entities/category/components";
import { TagBadge } from "@entities/tag/components";
import { AdminBadge, AdminPublicBadge } from "@shared/components";
import { ShortsType } from "@shared/mocks/mockAdminShorts";

interface AdminShortsDetailModalProps {
  shorts: ShortsType | null;
  onClose: () => void;
}

export function AdminShortsDetailModal({
  shorts,
  onClose,
}: AdminShortsDetailModalProps) {
  if (!shorts) return null;

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
    if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)}MB`;
    return `${(bytes / 1024).toFixed(1)}KB`;
  };

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
              {shorts.thumbnailShorts ? (
                <Image
                  src={shorts.thumbnailShorts}
                  alt={`${shorts.title} 세로 썸네일`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full bg-ot-gray-200"
                  aria-label="썸네일 없음"
                />
              )}
            </div>
          </div>

          {/* 우측: 메타 정보 */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-semibold">제목</p>
              <p className="text-sm">{shorts.title}</p>
            </div>

            <div>
              <p className="text-base font-semibold">설명</p>
              <p className="text-sm leading-relaxed">{shorts.description}</p>
            </div>

            <div>
              <p className="text-base font-semibold">원본 콘텐츠</p>
              <p className="text-sm">{shorts.originalContents.originalTitle}</p>
            </div>

            <div>
              <p className="text-base font-semibold">업로더</p>
              <p className="text-sm">{shorts.uploader}</p>
            </div>

            {/* 재생 시간 | 파일 크기 */}
            <div className="grid grid-cols-2">
              <div>
                <p className="text-base font-semibold">재생 시간</p>
                <p className="text-sm">{shorts.duration}</p>
              </div>
              <div>
                <p className="text-base font-semibold">파일 크기</p>
                <p className="text-sm">{formatSize(shorts.size)}</p>
              </div>
            </div>

            {/* 카테고리 | 태그 */}
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">카테고리</p>
                <div className="flex items-center">
                  <CategoryBadge category={shorts.originalContents.category} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">태그</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {shorts.originalContents.tags.map((tag) => (
                    <TagBadge
                      key={tag}
                      label={tag}
                      category={shorts.originalContents.category}
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
                isPublic={shorts.isPublic ? true : false}
              />
            </div>

            {/* 북마크 | 업로드 일자 */}
            <div className="grid grid-cols-2">
              <div>
                <p className="text-base font-semibold">북마크</p>
                <p className="text-sm flex items-center gap-1">
                  <Bookmark size={14} />
                  {shorts.bookmarkCount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-base font-semibold">업로드 일자</p>
                <p className="text-sm">{shorts.uploadDate}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
