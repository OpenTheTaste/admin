"use client";

import { useRef } from "react";
import { Film, Upload, X } from "lucide-react";
import { VideoFileMeta } from "@shared/types";

export interface AdminFileUploadProps {
  value: VideoFileMeta | null;
  onChange: (meta: VideoFileMeta | null) => void;
}

const formatSize = (bytes: number) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)}MB`;
  return `${(bytes / 1024).toFixed(1)}KB`;
};

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0
    ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export default function AdminFileUpload({
  value,
  onChange,
}: AdminFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      onChange({
        name: file.name,
        size: file.size,
        duration: formatDuration(video.duration),
      });
      URL.revokeObjectURL(video.src);
    };
  };

  return (
    <div>
      <p className="font-semibold text-lg mb-2">영상 파일</p>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
        accept=".mp4,.mov,.avi"
      />
      {value ? (
        <div className="flex items-center justify-between border border-ot-gray-600 rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ot-primary-50 rounded-md">
              <Film size={16} className="text-ot-primary-400" />
            </div>
            <div>
              <p className="text-sm text-ot-background">{value.name}</p>
              <p className="text-xs text-ot-gray-600 mt-0.5">
                {formatSize(value.size)} | {value.duration}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-ot-gray-600 hover:text-ot-background transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border border-dashed border-ot-gray-600 rounded-lg p-10 text-center hover:bg-ot-gray-200 transition-colors cursor-pointer"
        >
          <div className="p-3 bg-ot-primary-50 rounded-full flex items-center justify-center">
            <Upload size={22} className="text-ot-primary-400" />
          </div>
          <span className="text-sm font-semibold mt-3">
            클릭하여 파일 선택 또는 드래그 앤 드롭
          </span>
          <span className="text-xs text-ot-gray-700 mt-1">
            MP4, MOV, AVI (최대 10GB)
          </span>
        </label>
      )}
    </div>
  );
}

export type { VideoFileMeta };
