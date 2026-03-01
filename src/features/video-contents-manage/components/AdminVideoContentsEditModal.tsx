"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  AdminPosterUpload,
  PosterState,
} from "@features/upload/AdminPosterUpload";
import { AdminContentTypeSelector } from "@features/video-contents-manage/components";
import { AdminCategoryDropdown } from "@entities/category/components";
import { AdminSeriesDropdown } from "@entities/series/components";
import { AdminTagDropdown } from "@entities/tag/components";
import {
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
} from "@shared/components";
import { Category, ContentType } from "@shared/types";
import { AdminContentsDetailType } from "@shared/types/admin";

const SERIES_LIST = [
  "시리즈 없음",
  "더글로리 시즌1",
  "선재 업고 튀어",
  "흑백 요리사 시즌1",
  "흑백 요리사 시즌2",
  "대탈출 1",
];

interface AdminVideoContentsEditModalProps {
  contents: AdminContentsDetailType;
  onClose: () => void;
  onUpdate: (updated: AdminContentsDetailType) => void;
}

export function AdminVideoContentsEditModal({
  contents,
  onClose,
  onUpdate,
}: AdminVideoContentsEditModalProps) {
  const [title, setTitle] = useState<string>(contents.title);
  const [description, setDescription] = useState<string>(contents.description);
  const [cast, setCast] = useState<string>(contents.cast.join(", "));
  const [isPublic, setIsPublic] = useState<boolean>(contents.isPublic);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(
    contents.seriesTitle,
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    contents.category,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(contents.tags);
  const [poster, setPoster] = useState<PosterState>({
    vertical: contents.thumbnailVertical,
    horizontal: contents.thumbnailHorizontal,
  });

  const [contentType, setContentType] = useState<ContentType>(contents.type);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({
      ...contents,
      type: contentType,
      seriesTitle: contentType === "시리즈" ? selectedSeries : null,
      title,
      description,
      category: selectedCategory ?? contents.category,
      tags: selectedTags,
      isPublic,
      cast: cast
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      thumbnailVertical: poster.vertical ?? contents.thumbnailVertical,
      thumbnailHorizontal: poster.horizontal ?? contents.thumbnailHorizontal,
    });
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-218 bg-ot-text rounded-lg py-6 px-8 shadow-xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="relative mb-8 text-ot-background">
          <p className="text-2xl font-bold">콘텐츠 정보 수정</p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <form
          className="grid gap-y-6 text-ot-background"
          onSubmit={handleSubmit}
        >
          <AdminContentTypeSelector
            value={contentType}
            onChange={setContentType}
          />

          <AdminTextInput
            label="제목"
            placeholder='콘텐츠 제목을 입력하세요 (예: "시리즈명: 1화")'
            value={title}
            onChange={setTitle}
          />

          <AdminTextInput
            label="설명"
            placeholder="콘텐츠 설명을 입력하세요"
            multiline
            value={description}
            onChange={setDescription}
          />

          <AdminTextInput
            label="출연"
            placeholder="출연진은 쉼표(,)로 구분해 입력해 주세요 (예: 임지연, 송혜교, 이도현 · 최대 4인)"
            value={cast}
            onChange={setCast}
          />

          {/* 시리즈 + 공개 여부 */}
          <div className="grid grid-cols-2 gap-6">
            {contentType === "시리즈" ? (
              <AdminSeriesDropdown
                seriesList={SERIES_LIST}
                value={selectedSeries}
                onChange={setSelectedSeries}
              />
            ) : (
              <AdminSeriesDropdown
                seriesList={SERIES_LIST}
                value={selectedSeries}
                onChange={setSelectedSeries}
                disabled
              />
            )}
            <AdminPublicStatus isPublic={isPublic} onChange={setIsPublic} />
          </div>

          {/* 카테고리 + 태그 */}
          <div className="grid grid-cols-2 gap-6">
            <AdminCategoryDropdown
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
            <AdminTagDropdown
              category={selectedCategory}
              value={selectedTags}
              onChange={setSelectedTags}
            />
          </div>

          <AdminPosterUpload value={poster} onChange={setPoster} />

          {/* 버튼 */}
          <div className="grid grid-cols-2 gap-4">
            <CommonButton
              type="button"
              onClick={onClose}
              className="py-3 font-semibold"
              variant="outline"
            >
              취소
            </CommonButton>
            <CommonButton type="submit" className="py-3 font-semibold">
              수정 완료
            </CommonButton>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
