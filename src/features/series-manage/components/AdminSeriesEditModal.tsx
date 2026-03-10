"use client";

import { useEffect, useRef, useState } from "react";
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
  ConfirmModal,
  PosterState,
} from "@shared/components";
import { SeriesListItem } from "@entities/series/apis";
import { useFixSeries } from "@entities/series/hooks";
import { useSeriesDetail } from "@entities/series/hooks";
import { TAGS } from "@shared/types";
import { uploadFileToS3 } from "@shared/lib";

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
  const { data: seriesDetail } = useSeriesDetail(series?.mediaId ?? null);

  const { mutateAsync: fixSeries, isPending } = useFixSeries();

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

  const [fixError, setFixError] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  // 시리즈 상세 정보로 폼 초기화
  useEffect(() => {
    if (seriesDetail) {
      setDescription(seriesDetail.description);
      setCast(seriesDetail.actors);
      setPoster({
        posterUrl: seriesDetail.posterUrl,
        thumbnailUrl: seriesDetail.thumbnailUrl,
      });
    }
  }, [seriesDetail]);

  // 카테고리·태그 초기화
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

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!series || !selectedCategory || !seriesDetail) return;

    try {
      const { posterUploadUrl, thumbnailUploadUrl } = await fixSeries({
        seriesId: seriesDetail.seriesId,
        title,
        description,
        actors: cast,
        publicStatus: isPublic ? "PUBLIC" : "PRIVATE",
        categoryId: selectedCategory,
        tagIdList: selectedTags,
        ...(poster.posterFile && { posterFileName: poster.posterFile.name }),
        ...(poster.thumbnailFile && {
          thumbnailFileName: poster.thumbnailFile.name,
        }),
      });

      // 새 이미지가 있는 경우 S3에 업로드
      const s3Uploads: Promise<void>[] = [];
      if (posterUploadUrl && poster.posterFile) {
        s3Uploads.push(uploadFileToS3(posterUploadUrl, poster.posterFile));
      }
      if (thumbnailUploadUrl && poster.thumbnailFile) {
        s3Uploads.push(
          uploadFileToS3(thumbnailUploadUrl, poster.thumbnailFile),
        );
      }
      if (s3Uploads.length > 0) {
        await Promise.all(s3Uploads);
      }

      onUpdate();
    } catch (error) {
      console.error("수정 실패:", error);
      setFixError(true);
    }
  };

  const handleRetry = () => {
    setFixError(false);
    requestAnimationFrame(() => {
      formRef.current?.requestSubmit();
    });
  };

  const handleErrorClose = () => {
    setFixError(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <div
            className="relative w-218 bg-ot-text rounded-lg py-6 px-8 shadow-xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-8 text-ot-background">
              <p className="text-2xl font-bold">시리즈 수정</p>
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <form
              ref={formRef}
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

              <AdminPublicStatus isPublic={isPublic} onChange={setIsPublic} />

              <AdminTextInput
                label="출연"
                placeholder="출연진은 쉼표(,)로 구분해 입력해 주세요 (예: 임지연, 송혜교, 이도현 · 최대 4인)"
                value={cast}
                onChange={setCast}
              />

              <AdminPosterUpload value={poster} onChange={setPoster} />

              <div className="grid grid-cols-2 gap-4">
                <CommonButton
                  type="button"
                  onClick={handleClose}
                  className="py-3 font-semibold"
                  variant="outline"
                  disabled={isPending}
                >
                  취소
                </CommonButton>
                <CommonButton
                  type="submit"
                  className="py-3 font-semibold"
                  disabled={isPending}
                >
                  {isPending ? "수정 중..." : "수정 완료"}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}

      <ConfirmModal
        isOpen={fixError}
        message={"수정에 실패했습니다.\n다시 시도하시겠습니까?"}
        confirmText="재시도"
        cancelText="취소"
        onConfirm={handleRetry}
        onClose={handleErrorClose}
        disabled={isPending}
      />
    </>
  );
}
