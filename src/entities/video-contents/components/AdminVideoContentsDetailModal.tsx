"use client";

import Image from "next/image";
import { Bookmark, X } from "lucide-react";
import { CategoryBadge } from "@entities/category/components";
import { TagBadge } from "@entities/tag/components";
import { AdminBadge, AdminPublicBadge } from "@shared/components";
import { AdminContentsDetailType } from "@shared/types/admin";

interface AdminVideoContentsDetailModalProps {
  contents: AdminContentsDetailType | null;
  onClose: () => void;
}

export function AdminVideoContentsDetailModal({
  contents,
  onClose,
}: AdminVideoContentsDetailModalProps) {
  if (!contents) return null;

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
        className="relative bg-ot-text rounded-lg w-full max-w-3xl mx-4 p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-8 text-ot-background">
          <p className="text-2xl font-bold">콘텐츠 상세정보</p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* 썸네일 */}
        <section className="flex flex-col gap-2">
          <p className="text-base text-ot-background font-semibold">썸네일</p>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 ">
              <p className="text-sm text-ot-background">세로 (5:7)</p>
              <div className="relative w-60 aspect-5/7 rounded-lg overflow-hidden">
                <Image
                  src={contents.thumbnailVertical || ""}
                  alt={`${contents.title} 세로 썸네일`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-ot-background">가로 (4:3)</p>
              <div className="relative w-113 aspect-4/3 rounded-lg overflow-hidden">
                <Image
                  src={contents.thumbnailHorizontal || ""}
                  alt={`${contents.title} 가로 썸네일`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 시리즈 제목 */}
        {/* 메타 정보 그리드 */}
        <section className="grid grid-cols-2 gap-x-16 mt-4 text-ot-background">
          {/* 왼쪽 컬럼 */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-semibold">제목</p>
              <p className="text-sm">{contents.title}</p>
            </div>

            <div>
              <p className="text-base font-semibold">설명</p>
              <p className="text-sm leading-relaxed">{contents.description}</p>
            </div>

            {contents.cast.length > 0 && (
              <div>
                <p className="text-base font-semibold">출연</p>
                <p className="text-sm">{contents.cast.join(", ")}</p>
              </div>
            )}

            <div>
              <p className="text-base font-semibold">시리즈</p>
              <p className="text-sm">
                {contents.type === "시리즈" ? contents.seriesTitle : "-"}
              </p>
            </div>

            <div>
              <p className="text-base font-semibold">업로더</p>
              <p className="text-sm">{contents.uploader}</p>
            </div>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-semibold">재생 시간</p>
              <p className="text-sm">{contents.duration}</p>
            </div>

            <div>
              <p className="text-base font-semibold">파일 크기</p>
              <p className="text-sm">{formatSize(contents.size)}</p>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">카테고리</p>
                <div className="flex items-center">
                  <CategoryBadge category={contents.category} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">태그</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {contents.tags.map((tag) => (
                    <TagBadge
                      key={tag}
                      label={tag}
                      category={contents.category}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-base font-semibold mb-0.5">공개 여부</p>
              <AdminPublicBadge
                context="modal"
                isPublic={contents.isPublic ? true : false}
              />
            </div>

            <div>
              <p className="text-base font-semibold">북마크</p>
              <p className="text-sm flex items-center gap-1">
                <Bookmark size={14} />
                {contents.bookmarkCount.toLocaleString()}
              </p>
            </div>

            {/* 🔥 업로드일자 우측 하단 고정 */}
            <div>
              <p className="text-base font-semibold">업로드 일자</p>
              <p className="text-sm">{contents.uploadDate}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
