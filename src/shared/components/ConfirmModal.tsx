"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { CommonButton } from "@shared/components";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
  disabled?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "예",
  cancelText = "아니요",
  disabled = false,
}: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  const handleConfirm = () => {
    if (!disabled) onConfirm();
  };

  const handleClose = () => {
    if (!disabled) onClose();
  };

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isMounted) {
    return null;
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
        <button
          className="absolute right-7 top-7 transition-opacity hover:opacity-70 cursor-pointer"
          onClick={handleClose}
          disabled={disabled}
        >
          <X size={24} className="text-ot-text" strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center">
          <div className="pb-10">
            <p className="w-72 text-center text-[24px] font-bold text-ot-text leading-tight whitespace-pre-line">
              {message}
            </p>
          </div>

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
