"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { CommonButton } from "@shared/components";

interface UploadButtonProps {
  label?: string;
  renderModal: (props: {
    open: boolean;
    onClose: () => void;
  }) => React.ReactNode;
}

export function UploadButton({
  label = "콘텐츠 업로드",
  renderModal,
}: UploadButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <CommonButton
        onClick={() => setOpen(true)}
        className="text-ot-text py-3 px-8 font-semibold flex items-center gap-2"
      >
        <Upload size={22} />
        {label}
      </CommonButton>
      {renderModal({ open, onClose: () => setOpen(false) })}
    </>
  );
}
