"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ShortsDetailResponse } from "@/entities/shorts/apis";
import { useShortsDetail } from "@/entities/shorts/hooks";
import { PublicStatus } from "@/shared/types";
import { X } from "lucide-react";
import { ContentListItem } from "@entities/video-contents/apis";
import { AdminOriginalContentsDropdown } from "@entities/video-contents/components";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  PosterState,
} from "@shared/components";

interface AdminShortsEditModalProps {
  mediaId: number;
  onClose: () => void;
  onUpdate: (updated: ShortsDetailResponse) => void;
}

export function AdminShortsEditModal({
  mediaId,
  onClose,
  onUpdate,
}: AdminShortsEditModalProps) {
  const { data, isLoading, isError } = useShortsDetail(mediaId);

  const [isInitialized, setIsInitialized] = useState<boolean>(false); // 초기 데이터 세팅 여부
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedOriginal, setSelectedOriginal] =
    useState<ContentListItem | null>(null);
  const [isPublic, setIsPublic] = useState<PublicStatus>("PUBLIC");
  const [poster, setPoster] = useState<PosterState>({
    posterUrl: null,
  });

  useEffect(() => {
    if (!data || isInitialized) return;
    setTitle(data.title);
    setDescription(data.description);
    setIsPublic(data.publicStatus);
    setSelectedOriginal(
      data.originContentsTitle
        ? {
            mediaId: 0,
            title: data.originContentsTitle,
            posterUrl: "",
            uploadedDate: "",
          }
        : null,
    );
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

  const handleOriginalContentsChange = (original: ContentListItem | null) => {
    setSelectedOriginal(original);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({
      ...data,
      title,
      description,
      originContentsTitle: selectedOriginal?.title ?? data.originContentsTitle,
      publicStatus: isPublic,
      posterUrl: poster.posterUrl ?? data.posterUrl,
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
          <p className="text-2xl font-bold">숏폼 정보 수정</p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-ot-background hover:text-ot-gray-600 transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <form
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
                onChange={setSelectedOriginal}
              />
              <AdminPublicStatus
                isPublic={isPublic === "PUBLIC"}
                onChange={(bool) => setIsPublic(bool ? "PUBLIC" : "PRIVATE")}
              />
            </div>

            {/* 우측 */}
            {/* <AdminPosterUpload value={poster} onChange={setPoster} isShorts /> */}
          </div>

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
