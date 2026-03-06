"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AdminContentTypeSelector } from "@features/video-contents-manage/components";
import { AdminCategoryDropdown } from "@entities/category/components";
import { AdminSeriesDropdown } from "@entities/series/components";
import { AdminTagDropdown } from "@entities/tag/components";
import { UploadVideoRequest } from "@entities/video-contents/apis";
import { useUploadVideoContents } from "@entities/video-contents/hooks";
import {
  AdminFileUpload,
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  PosterState,
} from "@shared/components";
import { uploadFileToS3 } from "@shared/lib";
import { ContentType, VideoFileMeta } from "@shared/types";

interface AdminUploadModalProps {
  open: boolean;
  onClose: () => void;
}

// FIXME: 시리즈 목록 API 연동 필요
const SERIES_LIST = [
  "시리즈 없음",
  "더글로리",
  "선재 업고 튀어",
  "흑백 요리사 시즌1",
  "흑백 요리사 시즌2",
  "대탈출 1",
];

export function AdminVideoContentsUploadModal({
  open,
  onClose,
}: AdminUploadModalProps) {
  const { mutateAsync: uploadVideo, isPending } = useUploadVideoContents();

  const [mounted, setMounted] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const [videoFile, setVideoFile] = useState<VideoFileMeta | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
    thumbnailUrl: null,
  });
  const [contentType, setContentType] = useState<ContentType>("단편");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleCategoryChange = (category: number | null) => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!videoFile || !selectedCategory) return;

    const body: UploadVideoRequest = {
      title,
      description,
      actors: cast,
      publicStatus: isPublic ? "PUBLIC" : "PRIVATE",
      categoryId: selectedCategory,
      tagIdList: selectedTags,
      duration: videoFile.duration,
      videoSize: videoFile.size,
      seriesId:
        contentType === "시리즈" && selectedSeries
          ? Number(selectedSeries)
          : undefined,
      posterFileName: poster.posterFile?.name,
      thumbnailFileName: poster.thumbnailFile?.name,
      originFileName: videoFile.name,
    };

    try {
      // 1️⃣ 메타데이터 전송 → Presigned URL 수신
      const { posterUploadUrl, thumbnailUploadUrl, originUploadUrl } =
        await uploadVideo(body);

      // 2️⃣ S3 직접 업로드 (병렬)
      await Promise.all([
        poster.posterFile
          ? uploadFileToS3(posterUploadUrl, poster.posterFile)
          : Promise.resolve(),
        poster.thumbnailFile
          ? uploadFileToS3(thumbnailUploadUrl, poster.thumbnailFile)
          : Promise.resolve(),
        videoFile.file
          ? uploadFileToS3(originUploadUrl, videoFile.file)
          : Promise.resolve(),
      ]);

      console.log("✅ S3 업로드 완료");
      // 3️⃣ 완료 후 모달 닫기
      onClose();
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
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
          className="grid gap-y-6 text-ot-background"
          onSubmit={handleSubmit}
        >
          <AdminContentTypeSelector
            value={contentType}
            onChange={setContentType}
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
              seriesList={SERIES_LIST}
              value={selectedSeries}
              onChange={setSelectedSeries}
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
              disabled={isPending}
            >
              {isPending ? "업로드 중..." : "업로드 시작"}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
