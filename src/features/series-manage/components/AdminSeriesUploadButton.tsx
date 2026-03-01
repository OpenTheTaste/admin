"use client";

import { AdminSeriesUploadModal } from "@features/series-manage/components";
import { UploadButton } from "@shared/components";

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
