"use client";

import { UploadButton } from "@shared/components";
import { AdminSeriesUploadModal } from "@features/series-manage/components";

export function AdminSeriesUploadButton() {
  return (
    <UploadButton
      label="시리즈 등록"
      renderModal={({ open, onClose }) => (
        <AdminSeriesUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
