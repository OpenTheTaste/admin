"use client";

import Image from "next/image";
import { useRef } from "react";
import { ImageIcon, X } from "lucide-react";

export interface PosterState {
  posterUrl?: string | null;
  thumbnailUrl?: string | null;
  posterFile?: File | null;
  thumbnailFile?: File | null;
}

export interface AdminPosterUploadProps {
  value: PosterState;
  onChange: (value: PosterState) => void;
  isShorts?: boolean;
}

export function AdminPosterUpload({
  value,
  onChange,
  isShorts = false,
}: AdminPosterUploadProps) {
  const verticalInputRef = useRef<HTMLInputElement>(null);
  const horizontalInputRef = useRef<HTMLInputElement>(null);

  const handleVertical = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({
      ...value,
      posterUrl: URL.createObjectURL(file),
      posterFile: file,
    });
  };

  const handleHorizontal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({
      ...value,
      thumbnailUrl: URL.createObjectURL(file),
      thumbnailFile: file,
    });
  };

  const removeVertical = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ ...value, posterUrl: null, posterFile: null });
    if (verticalInputRef.current) verticalInputRef.current.value = "";
  };

  const removeHorizontal = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ ...value, thumbnailUrl: null, thumbnailFile: null });
    if (horizontalInputRef.current) horizontalInputRef.current.value = "";
  };

  return (
    <div>
      <p className="font-semibold text-lg mb-2">썸네일 업로드</p>
      <div className="flex justify-between gap-6">
        {/* 세로 포스터 (5:7) */}
        <div>
          <p className="text-sm mb-2 text-ot-gray-700">세로 포스터 (5:7)</p>
          <input
            ref={verticalInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleVertical}
          />
          <div
            className="h-85 relative border border-dashed border-ot-gray-600 rounded-lg overflow-hidden cursor-pointer hover:bg-ot-gray-200 transition-colors aspect-5/7"
            onClick={() => verticalInputRef.current?.click()}
          >
            {value.posterUrl ? (
              <>
                <Image
                  src={value.posterUrl}
                  fill
                  alt="세로 포스터 미리보기"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeVertical}
                  className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 transition-colors rounded-full p-1 text-ot-text cursor-pointer"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ot-gray-600">
                <ImageIcon size={28} strokeWidth={1} />
                <span className="text-xs">클릭하여 업로드</span>
              </div>
            )}
          </div>
        </div>

        {/* 가로 포스터 (4:3) */}
        {!isShorts && (
          <div>
            <p className="text-sm mb-2 text-ot-gray-700">가로 포스터 (4:3)</p>
            <input
              ref={horizontalInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleHorizontal}
            />
            <div
              className="h-85 relative border border-dashed border-ot-gray-600 rounded-lg overflow-hidden cursor-pointer hover:bg-ot-gray-200 transition-colors aspect-4/3"
              onClick={() => horizontalInputRef.current?.click()}
            >
              {value.thumbnailUrl ? (
                <>
                  <Image
                    src={value.thumbnailUrl}
                    fill
                    alt="가로 포스터 미리보기"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeHorizontal}
                    className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 transition-colors rounded-full p-1 text-ot-text cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ot-gray-600">
                  <ImageIcon size={28} strokeWidth={1} />
                  <span className="text-xs">클릭하여 업로드</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
