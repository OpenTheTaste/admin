"use client";

import { AdminVideoContentsUploadModal } from "@features/video-contents-manage/components";
import { UploadButton } from "@shared/components";

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
