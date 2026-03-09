"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/shared/hooks";
import { uploadFileToS3 } from "@/shared/lib";
import { X } from "lucide-react";
import { OriginMediaItem } from "@entities/originMedia/apis";
import { AdminOriginalContentsDropdown } from "@entities/originMedia/components";
import { UploadShortsRequest } from "@entities/shorts/apis";
import { useUploadShorts } from "@entities/shorts/hooks";
import {
  AdminFileUpload,
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  ConfirmModal,
  PosterState,
} from "@shared/components";
import { VideoFileMeta } from "@shared/types";

interface AdminShortsUploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminShortsUploadModal({
  open,
  onClose,
}: AdminShortsUploadModalProps) {
  const mounted = useIsMounted();
  const { mutateAsync: uploadShorts, isPending } = useUploadShorts();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<VideoFileMeta | null>(null);
  const [selectedOriginal, setSelectedOriginal] =
    useState<OriginMediaItem | null>(null);
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
  });
  const [uploadError, setUploadError] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const isFormValid =
    !!videoFile &&
    !!title.trim() &&
    !!description.trim() &&
    !!poster.posterFile &&
    !!selectedOriginal;

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

  if (!mounted || !open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoFile || !selectedOriginal) return;

    const body: UploadShortsRequest = {
      title,
      description,
      mediaType: selectedOriginal.mediaType,
      publicStatus: isPublic ? "PUBLIC" : "PRIVATE",
      originId: selectedOriginal.originId,
      duration: videoFile.duration,
      videoSize: videoFile.size,
      posterFileName: poster.posterFile?.name,
      thumbnailFileName: poster.thumbnailFile?.name,
      originFileName: videoFile!.name,
    };
    try {
      // throw new Error("강제 에러 테스트"); // error 테스트 시 주석 해제
      const { posterUploadUrl, originUploadUrl } = await uploadShorts(body);

      // S3 직접 업로드 (병렬)
      await Promise.all([
        poster.posterFile
          ? uploadFileToS3(posterUploadUrl, poster.posterFile)
          : Promise.resolve(),
        videoFile.file
          ? uploadFileToS3(originUploadUrl, videoFile.file)
          : Promise.resolve(),
      ]);
      onClose();
    } catch (error) {
      console.error("업로드 실패:", error);
      setUploadError(true);
    }
  };

  const handleClose = () => {
    if (isPending) return;
    onClose();
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
              <p className="text-2xl font-bold">숏폼 업로드</p>
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <form
              ref={formRef}
              className="flex flex-col gap-6 text-ot-background"
              onSubmit={handleSubmit}
            >
              <AdminFileUpload value={videoFile} onChange={setVideoFile} />

              <AdminTextInput
                label="제목"
                placeholder="숏폼 제목을 입력하세요"
                value={title}
                onChange={setTitle}
              />

              <AdminTextInput
                label="설명"
                placeholder="숏폼 설명을 입력하세요"
                multiline
                value={description}
                onChange={setDescription}
              />

              {/* 원본콘텐츠·공개여부 + 포스터 */}
              <div className="grid grid-cols-2 gap-12">
                {/* 좌측 */}
                <div className="flex flex-col gap-6">
                  <AdminOriginalContentsDropdown
                    value={selectedOriginal}
                    onChange={setSelectedOriginal}
                  />
                  <AdminPublicStatus
                    isPublic={isPublic}
                    onChange={setIsPublic}
                  />
                </div>
                {/* 우측 */}
                <AdminPosterUpload
                  value={poster}
                  onChange={setPoster}
                  isShorts
                />
              </div>

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
