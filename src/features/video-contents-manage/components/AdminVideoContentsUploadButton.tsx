"use client";

import { AdminVideoContentsUploadModal } from "@features/video-contents-manage/components";
import { UploadButton } from "@shared/components";

export function AdminVideoContentsUploadButton() {
  return (
    <UploadButton
      label="콘텐츠 업로드"
      renderModal={({ open, onClose }) => (
        <AdminVideoContentsUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
