"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AdminContentTypeSelector } from "@features/video-contents-manage/components";
import { AdminCategoryDropdown } from "@entities/category/components";
import { AdminSeriesDropdown } from "@entities/series/components";
import { AdminTagDropdown } from "@entities/tag/components";
import { ContentDetailResponse } from "@entities/video-contents/apis";
import { useContentDetail } from "@entities/video-contents/hooks";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  PosterState,
} from "@shared/components";
import { Category, ContentType, PublicStatus } from "@shared/types";

// FIXME: series 조회 api 필요 (현재는 고정값)
const SERIES_LIST = [
  "시리즈 없음",
  "더글로리 시즌1",
  "선재 업고 튀어",
  "흑백 요리사 시즌1",
  "흑백 요리사 시즌2",
  "대탈출 1",
];

interface AdminVideoContentsEditModalProps {
  mediaId: number;
  onClose: () => void;
  onUpdate: (updated: ContentDetailResponse) => void;
}

export function AdminVideoContentsEditModal({
  mediaId,
  onClose,
  onUpdate,
}: AdminVideoContentsEditModalProps) {
  const { data, isLoading, isError } = useContentDetail(mediaId);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [isPublic, setIsPublic] = useState<PublicStatus>("PUBLIC");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
    thumbnailUrl: null,
  });

  useEffect(() => {
    if (!data) return;
    setTitle(data.title);
    setDescription(data.description);
    setCast(data.actors);
    setIsPublic(data.publicStatus);
    setSelectedSeries(data.seriesTitle);
    setSelectedCategory(data.categoryName);
    setSelectedTags(data.tagNameList);
    setPoster({
      posterUrl: data.posterUrl,
      thumbnailUrl: data.thumbnailUrl,
    });
  }, [data]);

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

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>에러</div>;

  if (typeof document === "undefined") return null;

  // seriesTitle이 null이면 "단편", 값이 있으면 "시리즈"로 파생
  const contentType: ContentType = selectedSeries ? "시리즈" : "단편";

  const handleContentTypeChange = (type: ContentType) => {
    if (type === "단편") {
      setSelectedSeries(null);
      return;
    }
    setSelectedSeries(data.seriesTitle ?? "시리즈 없음");
  };

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({
      ...data,
      seriesTitle: selectedSeries ?? null,
      title,
      description,
      categoryName: selectedCategory ?? data.categoryName,
      tagNameList: selectedTags,
      publicStatus: isPublic,
      actors: cast,
      posterUrl: poster.posterUrl ?? data.posterUrl,
      thumbnailUrl: poster.thumbnailUrl ?? data.thumbnailUrl,
    });
  };

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
            onChange={handleContentTypeChange}
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

          {/* 시리즈 드롭다운: 타입이 "시리즈"일 때만 활성화 */}
          <div className="grid grid-cols-2 gap-6">
            <AdminSeriesDropdown
              seriesList={SERIES_LIST}
              value={selectedSeries}
              onChange={setSelectedSeries}
              disabled={contentType === "단편"}
            />
            <AdminPublicStatus
              isPublic={isPublic === "PUBLIC"}
              onChange={(bool) => setIsPublic(bool ? "PUBLIC" : "PRIVATE")}
            />
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

          {/* <AdminPosterUpload value={poster} onChange={setPoster} /> */}

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
