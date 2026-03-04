// 파일크기 포맷터
export const formatSize = (bytes: number) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)}MB`;
  return `${(bytes / 1024).toFixed(1)}KB`;
};

// 재생시간 포맷터 (초 → 시:분:초)
export const formatDuration = (seconds: number) => {
  const hors = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hors}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
