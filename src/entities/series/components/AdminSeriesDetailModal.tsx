"use client";

import Image from "next/image";
import { Bookmark, X } from "lucide-react";
import { AdminBadge } from "@shared/components";
import { AdminSeries } from "@shared/mocks/mockAdminSeries";

interface AdminSeriesDetailModalProps {
  series: AdminSeries | null;
  onClose: () => void;
}

export function AdminSeriesDetailModal({
  series,
  onClose,
}: AdminSeriesDetailModalProps) {
  if (!series) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-ot-text rounded-lg w-full max-w-4xl mx-4 p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-8 text-ot-background">
          <p className="text-2xl font-bold">시리즈 상세정보</p>
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
                  src={series.thumbnailVertical}
                  alt={`${series.title} 세로 썸네일`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-ot-background">가로 (4:3)</p>
              <div className="relative w-113 aspect-4/3 rounded-lg overflow-hidden">
                <Image
                  src={series.thumbnailHorizontal}
                  alt={`${series.title} 가로 썸네일`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 시리즈 제목 */}
        <section className="flex flex-col gap-1">
          <p className="text-base text-ot-background font-semibold">
            시리즈 제목
          </p>
          <p className="text-sm font-semibold text-ot-background">
            {series.title}
          </p>
        </section>

        {/* 설명 */}
        <section className="flex flex-col gap-1">
          <p className="text-base text-ot-background font-semibold">설명</p>
          <p className="text-sm text-ot-background leading-relaxed">
            {series.description}
          </p>
        </section>

        {/* 카테고리 / 태그 / 공개여부 */}
        <section className="flex gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-base text-ot-background font-semibold">
              카테고리
            </p>
            <span
            // className={cn(badgeBase, CATEGORY_STYLE_MAP[series.category])}
            >
              {series.category}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-base text-ot-background font-semibold">태그</p>
            <div className="flex flex-wrap gap-1">
              {series.tags.map((tag) => (
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
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-base text-ot-background font-semibold">
              공개여부
            </p>
            <AdminBadge variant={series.isPublic ? "공개" : "비공개"} />
          </div>
        </section>

        {/* 업로더 / 북마크 / 출연 */}
        <section className="flex gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-base text-ot-background font-semibold">업로더</p>
            <p className="text-sm text-ot-background">{series.uploader}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-base text-ot-background font-semibold">북마크</p>
            <p className="text-sm text-ot-background flex items-center gap-1">
              <Bookmark size={14} />
              {series.bookmarkCount.toLocaleString()}
            </p>
          </div>

          {series.cast.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-base text-ot-background font-semibold">출연</p>
              <p className="text-sm text-ot-background">
                {series.cast.join(", ")}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
