"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AdminCategoryDropdown } from "@entities/category/components";
import { useCategories } from "@entities/category/hooks";
import { AdminTagDropdown } from "@entities/tag/components";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  PosterState,
} from "@shared/components";
import { SeriesListItem } from "@entities/series/apis";
import { TAGS } from "@shared/types";

interface AdminSeriesFixModalProps {
  series: SeriesListItem | null;
  onClose: () => void;
  onUpdate: () => void;
}

export function AdminSeriesEditModal({
  series,
  onClose,
  onUpdate,
}: AdminSeriesFixModalProps) {
  const { data: categories } = useCategories();

  const [title, setTitle] = useState<string>(series?.title ?? "");
  const [description, setDescription] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(
    series?.publicStatus === "PUBLIC",
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
    thumbnailUrl: null,
  });

  useEffect(() => {
    if (categories && series) {
      const categoryId =
        categories.find((c) => c.categoryName === series.categoryName)
          ?.categoryId ?? null;
      setSelectedCategory(categoryId);

      if (categoryId !== null) {
        const allTags = Object.values(TAGS).flat();
        const tagIds = series.tagNameList
          .map((name) => allTags.find((t) => t.name === name)?.tagId)
          .filter((id): id is number => id !== undefined);
        setSelectedTags(tagIds);
      }
    }
  }, [categories, series]);

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

  const handleCategoryChange = (category: number | null) => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 시리즈 수정 API 연동
    onUpdate();
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
          <p className="text-2xl font-bold">시리즈 수정</p>
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
          <AdminTextInput
            label="제목"
            placeholder="콘텐츠 제목을 입력하세요"
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

          {/* 공개여부 */}
          <AdminPublicStatus isPublic={isPublic} onChange={setIsPublic} />

          <AdminTextInput
            label="출연"
            placeholder="출연진은 쉼표(,)로 구분해 입력해 주세요 (예: 임지연, 송혜교, 이도현 · 최대 4인)"
            value={cast}
            onChange={setCast}
          />

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
