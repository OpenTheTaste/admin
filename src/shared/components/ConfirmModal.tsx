"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { CommonButton } from "@shared/components";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";

interface ConfirmModalProps {
  isOpen: boolean; // 모달 열림 여부
  onConfirm: () => void; // YES 클릭 시
  onClose: () => void; // NO 클릭 시
  message: string; // 안내 문구
  confirmText?: string; // YES 버튼 텍스트 (기본값: "예")
  cancelText?: string; // NO 버튼 텍스트 (기본값: "아니요")
  disabled?: boolean; // 중복 클릭 방지
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "예",
  cancelText = "아니요",
  disabled = false, // 중복 클릭 방지
}: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen); // 관련 hook 추가하여 사용

  const handleConfirm = () => {
    if (!disabled) onConfirm();
  };

  const handleClose = () => {
    if (!disabled) onClose();
  };

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달창 열리면 뒷 원본 페이지 스크롤 기능 X
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc); // ESC 누르면 모달창 닫음
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isMounted) {
    return null; // 서버 사이드에서는 렌더링하지 않음 -> 에러 방지
  }
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative pt-18 px-20 pb-14 rounded-xl bg-ot-gray-800 shadow-2xl"
      >
        {/* 모달창 닫기 X 버튼 */}
        <button
          className="absolute right-7 top-7 transition-opacity hover:opacity-70 cursor-pointer"
          onClick={handleClose}
          disabled={disabled}
        >
          <X size={24} className="text-ot-text" strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center">
          {/* 안내 문구 */}
          <div className="pb-10">
            <p className="w-72 text-center text-[24px] font-bold text-ot-text leading-tight whitespace-pre-line">
              {message}
            </p>
          </div>

          {/* 버튼 두 개 묶음 */}
          <div className="flex gap-8">
            <CommonButton
              className="w-32 h-10 text-ot-text transition-opacity hover:opacity-70"
              onClick={handleConfirm}
              disabled={disabled}
            >
              {confirmText}
            </CommonButton>
            <CommonButton
              variant="secondary"
              className="w-32 h-10 text-ot-text"
              onClick={handleClose}
              disabled={disabled}
            >
              {cancelText}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
