"use client";

import { AdminShortsUploadModal } from "@features/shorts-manage";
import { UploadButton } from "@shared/components";

export default function AdminShortsUploadButton() {
  return (
    <UploadButton
      label="숏폼 업로드"
      renderModal={({ open, onClose }) => (
        <AdminShortsUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
