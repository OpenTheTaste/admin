"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { AdminCategoryDropdown } from "@entities/category/components";
import { useUploadSeries } from "@entities/series/hooks";
import { AdminTagDropdown } from "@entities/tag/components";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  ConfirmModal,
  PosterState,
} from "@shared/components";
import { useIsMounted } from "@shared/hooks";
import { uploadFileToS3 } from "@shared/lib";

interface AdminSeriesUploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSeriesUploadModal({
  open,
  onClose,
}: AdminSeriesUploadModalProps) {
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
  const queryClient = useQueryClient();
  const { mutateAsync: uploadSeries, isPending } = useUploadSeries();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cast, setCast] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
    thumbnailUrl: null,
  });
  const [uploadError, setUploadError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const isFormValid =
    !!title.trim() &&
    !!description.trim() &&
    !!cast.trim() &&
    !!selectedCategory &&
    selectedTags.length > 0 &&
    !!poster.posterFile &&
    !!poster.thumbnailFile;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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

    try {
      // 1. 메타데이터 전송 → Presigned URL 수신
      const { posterUploadUrl, thumbnailUploadUrl } = await uploadSeries({
        title,
        description,
        actors: cast,
        publicStatus: isPublic ? "PUBLIC" : "PRIVATE",
        categoryId: selectedCategory!,
        tagIdList: selectedTags,
        posterFileName: poster.posterFile!.name,
        thumbnailFileName: poster.thumbnailFile!.name,
      });

      // 2. S3 직접 업로드 (병렬)
      await Promise.all([
        uploadFileToS3(posterUploadUrl, poster.posterFile!),
        uploadFileToS3(thumbnailUploadUrl, poster.thumbnailFile!),
      ]);

      queryClient.invalidateQueries({ queryKey: ["series", "list"] });
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
            <div className="relative mb-8 text-ot-background">
              <p className="text-2xl font-bold">시리즈 등록</p>
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
                placeholder="시리즈 제목을 입력하세요"
                value={title}
                onChange={setTitle}
              />

              <AdminTextInput
                label="설명"
                placeholder="시리즈 설명을 입력하세요"
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
