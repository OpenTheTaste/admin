"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { AdminContentTypeSelector } from "@features/video-contents-manage/components";
import { AdminCategoryDropdown } from "@entities/category/components";
import { useCategories } from "@entities/category/hooks";
import { AdminSeriesDropdown } from "@entities/series/components";
import { useTagsByCategory } from "@entities/statistics/hooks";
import { AdminTagDropdown } from "@entities/tag/components";
import {
  SeriesTitleItem,
  UploadVideoRequest,
} from "@entities/video-contents/apis";
import {
  useContentDetail,
  useUpdateVideoContents,
} from "@entities/video-contents/hooks";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  ConfirmModal,
  PosterState,
} from "@shared/components";
import { uploadFileToS3 } from "@shared/lib";
import { ContentType, PublicStatus } from "@shared/types";

interface AdminVideoContentsEditModalProps {
  mediaId: number;
  onClose: () => void;
}

export function AdminVideoContentsEditModal({
  mediaId,
  onClose,
}: AdminVideoContentsEditModalProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useContentDetail(mediaId);
  const { data: categories } = useCategories();
  const { mutateAsync: updateVideo, isPending } = useUpdateVideoContents();

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isTagInitialized, setIsTagInitialized] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [isPublic, setIsPublic] = useState<PublicStatus>("PUBLIC");
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [selectedSeriesTitle, setSelectedSeriesTitle] = useState<string | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [pendingTagNames, setPendingTagNames] = useState<string[] | null>(null);
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
    thumbnailUrl: null,
  });
  const [contentType, setContentType] = useState<ContentType>("단편");
  const [uploadError, setUploadError] = useState<boolean>(false);

  const { data: tagList } = useTagsByCategory(selectedCategory);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!data || isInitialized || !categories) return;
    setTitle(data.title);
    setDescription(data.description);
    setCast(data.actors);
    setIsPublic(data.publicStatus);
    setContentType(data.seriesTitle ? "시리즈" : "단편");
    setSelectedSeries(data.seriesId ?? null);
    setSelectedSeriesTitle(data.seriesTitle ?? null);

    const categoryId =
      categories.find((c) => c.categoryName === data.categoryName)
        ?.categoryId ?? null;
    setSelectedCategory(categoryId);

    setPoster({
      posterUrl: data.posterUrl,
      thumbnailUrl: data.thumbnailUrl,
    });
    setIsInitialized(true);
  }, [data, isInitialized, categories]);

  useEffect(() => {
    if (!data || !tagList || isTagInitialized) return;
    setSelectedTags(
      data.tagNameList
        .map((name) => tagList.find((t) => t.name === name)?.tagId)
        .filter((id): id is number => id !== undefined),
    );
    setIsTagInitialized(true);
  }, [data, tagList, isTagInitialized]);

  // pendingTagNames 있으면 tagList 로드 후 세팅
  useEffect(() => {
    if (!pendingTagNames || !tagList) return;
    setSelectedTags(
      pendingTagNames
        .map((name) => tagList.find((t) => t.name === name)?.tagId)
        .filter((id): id is number => id !== undefined),
    );
    setPendingTagNames(null);
  }, [pendingTagNames, tagList]);

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

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    if (type === "단편") {
      setSelectedSeries(null);
      setSelectedSeriesTitle(null);
      setSelectedCategory(null);
      setSelectedTags([]);
      setPendingTagNames(null);
    }
  };

  const handleCategoryChange = (category: number | null) => {
    setSelectedCategory(category);
    setSelectedTags([]);
    setPendingTagNames(null);
  };

  const handleSeriesChange = (
    seriesId: number | null,
    item: SeriesTitleItem | null,
  ) => {
    setSelectedSeries(seriesId);
    setSelectedSeriesTitle(item?.title ?? null);

    if (!item) {
      setSelectedCategory(null);
      setSelectedTags([]);
      setPendingTagNames(null);
      return;
    }

    const categoryId =
      categories?.find((c) => c.categoryName === item.categoryName)
        ?.categoryId ?? null;
    setSelectedCategory(categoryId);
    setSelectedTags([]);
    setPendingTagNames(item.tagNameList);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const body: UploadVideoRequest = {
      title,
      description,
      actors: cast,
      publicStatus: isPublic,
      categoryId: selectedCategory,
      tagIdList: selectedTags,
      seriesId:
        contentType === "시리즈" ? (selectedSeries ?? undefined) : undefined,
      posterFileName: poster.posterFile?.name,
      thumbnailFileName: poster.thumbnailFile?.name,
    };

    try {
      const { posterUploadUrl, thumbnailUploadUrl } = await updateVideo({
        contentsId: data.contentsId,
        body,
      });

      const s3Results = await Promise.allSettled([
        poster.posterFile
          ? uploadFileToS3(posterUploadUrl, poster.posterFile).then(
              () => "poster ✅",
            )
          : Promise.resolve("poster skipped"),
        poster.thumbnailFile
          ? uploadFileToS3(thumbnailUploadUrl, poster.thumbnailFile).then(
              () => "thumbnail ✅",
            )
          : Promise.resolve("thumbnail skipped"),
      ]);

      const failed = s3Results.filter((r) => r.status === "rejected");
      if (failed.length > 0) {
        setUploadError(true);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["contents", "list"] });
      onClose();
    } catch (error) {
      console.error("수정 실패:", error);
      setUploadError(true);
    }
  };

  const handleRetry = () => {
    setUploadError(false);
    requestAnimationFrame(() => {
      formRef.current?.requestSubmit();
    });
  };

  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <div
            className="relative w-218 bg-ot-text rounded-lg py-6 px-8 shadow-xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
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
              ref={formRef}
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

              <div className="grid grid-cols-2 gap-6">
                <AdminSeriesDropdown
                  value={selectedSeries}
                  selectedTitle={selectedSeriesTitle}
                  onChange={handleSeriesChange}
                  disabled={contentType === "단편"}
                />
                <AdminPublicStatus
                  isPublic={isPublic === "PUBLIC"}
                  onChange={(bool) => setIsPublic(bool ? "PUBLIC" : "PRIVATE")}
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <CommonButton
                  type="button"
                  onClick={onClose}
                  className="py-3 font-semibold"
                  variant="outline"
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
        isOpen={uploadError}
        message={"수정에 실패했습니다.\n다시 시도하시겠습니까?"}
        confirmText="재시도"
        cancelText="취소"
        onConfirm={handleRetry}
        onClose={() => setUploadError(false)}
        disabled={isPending}
      />
    </>
  );
}
