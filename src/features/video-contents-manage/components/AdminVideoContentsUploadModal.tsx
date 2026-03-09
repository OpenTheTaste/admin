"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { useUploadVideoContents } from "@entities/video-contents/hooks";
import {
  AdminFileUpload,
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  ConfirmModal,
  PosterState,
} from "@shared/components";
import { useIsMounted } from "@shared/hooks";
import { uploadFileToS3 } from "@shared/lib";
import { ContentType, VideoFileMeta } from "@shared/types";

interface AdminUploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminVideoContentsUploadModal({
  open,
  onClose,
}: AdminUploadModalProps) {
  const mounted = useIsMounted();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return <ModalInner onClose={onClose} />;
}

function ModalInner({ onClose }: { onClose: () => void }) {
  const { mutateAsync: uploadVideo, isPending } = useUploadVideoContents();
  const { data: categories } = useCategories();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<VideoFileMeta | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
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

  const isFormValid =
    !!videoFile &&
    !!title.trim() &&
    !!description.trim() &&
    !!cast.trim() &&
    !!selectedCategory &&
    selectedTags.length > 0 &&
    !!poster.posterFile &&
    !!poster.thumbnailFile &&
    (contentType !== "시리즈" || !!selectedSeries);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    if (type === "단편") {
      setSelectedSeries(null);
      setSelectedCategory(null);
      setSelectedTags([]);
      setPendingTagNames(null);
    }
  };

  const handleSeriesChange = (
    seriesId: number | null,
    item: SeriesTitleItem | null,
  ) => {
    setSelectedSeries(seriesId);
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

  const handleCategoryChange = (category: number | null) => {
    setSelectedCategory(category);
    setSelectedTags([]);
    setPendingTagNames(null);
  };

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: UploadVideoRequest = {
      title,
      description,
      actors: cast,
      publicStatus: isPublic ? "PUBLIC" : "PRIVATE",
      categoryId: selectedCategory!,
      tagIdList: selectedTags,
      duration: videoFile!.duration,
      videoSize: videoFile!.size,
      seriesId:
        contentType === "시리즈" ? (selectedSeries ?? undefined) : undefined,
      posterFileName: poster.posterFile?.name,
      thumbnailFileName: poster.thumbnailFile?.name,
      originFileName: videoFile!.name,
    };

    try {
      // throw new Error("강제 에러 테스트"); // error 테스트 시 주석 해제

      // 1. 메타데이터 전송 → Presigned URL 수신
      const { posterUploadUrl, thumbnailUploadUrl, originUploadUrl } =
        await uploadVideo(body);

      // 2. S3 직접 업로드 (병렬)
      await Promise.all([
        poster.posterFile
          ? uploadFileToS3(posterUploadUrl, poster.posterFile)
          : Promise.resolve(),
        poster.thumbnailFile
          ? uploadFileToS3(thumbnailUploadUrl, poster.thumbnailFile)
          : Promise.resolve(),
        videoFile!.file
          ? uploadFileToS3(originUploadUrl, videoFile!.file)
          : Promise.resolve(),
      ]);

      onClose();
    } catch (error) {
      console.error("업로드 실패:", error);
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
          onClick={handleClose}
        >
          <div
            className="relative w-218 bg-ot-text rounded-lg py-6 px-8 shadow-xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="relative mb-8 text-ot-background">
              <p className="text-2xl font-bold">콘텐츠 업로드</p>
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
              <AdminContentTypeSelector
                value={contentType}
                onChange={handleContentTypeChange}
              />
              <AdminFileUpload value={videoFile} onChange={setVideoFile} />

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
                <AdminSeriesDropdown
                  value={selectedSeries}
                  onChange={handleSeriesChange}
                  disabled={contentType !== "시리즈"}
                />
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
                  disabled={isPending || !isFormValid}
                >
                  {isPending ? "업로드 중..." : "업로드 시작"}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}

      {/* 서버/네트워크 에러 시 재시도 모달 */}
      <ConfirmModal
        isOpen={uploadError}
        message={"업로드에 실패했습니다.\n다시 시도하시겠습니까?"}
        confirmText="재시도"
        cancelText="취소"
        onConfirm={handleRetry}
        onClose={() => setUploadError(false)}
        disabled={isPending}
      />
    </>
  );
}
