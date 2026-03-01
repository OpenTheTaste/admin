"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  AdminFileUpload,
  AdminPosterUpload,
  PosterState,
} from "@features/upload";
import { AdminOriginalContentsDropdown } from "@entities/video-contents/components";
import {
  AdminPublicStatus,
  AdminTextInput,
  CommonButton,
} from "@shared/components";
import { VideoFileMeta } from "@shared/types";

interface AdminShortsUploadModalProps {
  open: boolean;
  onClose: () => void;
}

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
export function AdminShortsUploadModal({
  open,
  onClose,
}: AdminShortsUploadModalProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<VideoFileMeta | null>(null);
  const [selectedOriginal, setSelectedOriginal] = useState<string | null>(null);
  const [poster, setPoster] = useState<PosterState>({
    vertical: null,
    horizontal: null,
  });
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

  if (!mounted || !open) return null;

  const handleOriginalContentsChange = (original: string | null) => {
    setSelectedOriginal(original);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("숏폼 업로드 처리 로직");
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
          <p className="text-2xl font-bold">숏폼 업로드</p>
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
              업로드 시작
            </CommonButton>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
