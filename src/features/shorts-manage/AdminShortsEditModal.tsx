"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AdminOriginalContentsDropdown } from "@entities/video-contents/components";
import {
  AdminPosterUpload,
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
  PosterState,
} from "@shared/components";
import { ShortsType } from "@shared/mocks/mockAdminShorts";

const ORIGINAL_LIST = [
  "더글로리",
  "선재 업고 튀어",
  "흑백 요리사 시즌1",
  "흑백 요리사 시즌2",
  "대탈출 1",
  "대탈출 2",
  "대탈출 3",
  "대탈출 4",
  "대탈출 5",
];

interface AdminShortsEditModalProps {
  shorts: ShortsType;
  onClose: () => void;
  onUpdate: (updated: ShortsType) => void;
}

export function AdminShortsEditModal({
  shorts,
  onClose,
  onUpdate,
}: AdminShortsEditModalProps) {
  const [title, setTitle] = useState<string>(shorts.title);
  const [description, setDescription] = useState<string>(shorts.description);
  const [selectedOriginal, setSelectedOriginal] = useState<string | null>(
    shorts.originalContents.originalTitle,
  );
  const [isPublic, setIsPublic] = useState<boolean>(shorts.isPublic);
  const [poster, setPoster] = useState<PosterState>({
    thumbnailUrl: shorts.thumbnailUrl,
  });

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

  const handleOriginalContentsChange = (original: string | null) => {
    setSelectedOriginal(original);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({
      ...shorts,
      title,
      description,
      originalContents: {
        ...shorts.originalContents,
        originalTitle:
          selectedOriginal ?? shorts.originalContents.originalTitle,
      },
      isPublic,
      thumbnailUrl: poster.thumbnailUrl ?? shorts.thumbnailUrl,
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
                onChange={handleOriginalContentsChange}
                originalList={ORIGINAL_LIST}
              />
              <AdminPublicStatus isPublic={isPublic} onChange={setIsPublic} />
            </div>

            {/* 우측 */}
            <AdminPosterUpload value={poster} onChange={setPoster} isShorts />
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
