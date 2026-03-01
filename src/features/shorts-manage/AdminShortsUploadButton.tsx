"use client";

import { UploadButton } from "@shared/components";
import { AdminShortsUploadModal } from "@features/shorts-manage";

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
