"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { uploadFileToS3 } from "@/shared/lib";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { OriginMediaItem } from "@entities/originMedia/apis";
import { AdminOriginalContentsDropdown } from "@entities/originMedia/components";
import { UpdateShortsRequest } from "@entities/shorts/apis";
import { useShortsDetail, useUpdateShorts } from "@entities/shorts/hooks";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  ConfirmModal,
  PosterState,
} from "@shared/components";
import { PublicStatus } from "@shared/types";

interface AdminShortsEditModalProps {
  mediaId: number;
  onClose: () => void;
}

export function AdminShortsEditModal({
  mediaId,
  onClose,
}: AdminShortsEditModalProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useShortsDetail(mediaId);
  const { mutateAsync: updateShorts, isPending } = useUpdateShorts();

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedOriginal, setSelectedOriginal] =
    useState<OriginMediaItem | null>(null);
  const [selectedOriginalTitle, setSelectedOriginalTitle] = useState<
    string | null
  >(null);
  const [isPublic, setIsPublic] = useState<PublicStatus>("PUBLIC");
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
  });
  const [uploadError, setUploadError] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!data || isInitialized) return;
    setTitle(data.title);
    setDescription(data.description);
    setIsPublic(data.publicStatus);
    setSelectedOriginal({
      originId: data.originId,
      title: data.originContentsTitle,
      mediaType: data.originType,
    });
    setSelectedOriginalTitle(data.originContentsTitle);

    setPoster({
      posterUrl: data.posterUrl,
    });
    setIsInitialized(true);
  }, [data, isInitialized]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOriginal) return;

    const body: UpdateShortsRequest = {
      title,
      description,
      publicStatus: isPublic,
      posterFileName: poster.posterFile?.name,
      originId: selectedOriginal.originId,
      mediaType: selectedOriginal.mediaType,
    };

    try {
      const { posterUploadUrl } = await updateShorts({
        shortformId: data.shortFormId,
        body,
      });

      try {
        if (poster.posterFile) {
          await uploadFileToS3(posterUploadUrl, poster.posterFile);
        }
        queryClient.invalidateQueries({ queryKey: ["shorts", "list"] });
        onClose();
      } catch (error) {
        setUploadError(true);
      }
    } catch (error) {
      console.error("수정 실패:", error);
      setUploadError(true);
    }
  };

  if (typeof document === "undefined") return null;

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
            {/* 헤더 */}
            <div className="relative mb-8 text-ot-background">
              <p className="text-2xl font-bold">숏폼 정보 수정</p>
              <button
                onClick={onClose}
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
                    selectedTitle={selectedOriginalTitle}
                    onChange={setSelectedOriginal}
                  />
                  <AdminPublicStatus
                    isPublic={isPublic === "PUBLIC"}
                    onChange={(bool) =>
                      setIsPublic(bool ? "PUBLIC" : "PRIVATE")
                    }
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
                  onClick={onClose}
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
