"use client";

import { UploadButton } from "@shared/components";
import { AdminVideoContentsUploadModal } from "@features/video-contents-manage/components";

export default function AdminVideoContentsUploadButton() {
  return (
    <UploadButton
      label="콘텐츠 등록"
      renderModal={({ open, onClose }) => (
        <AdminVideoContentsUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
