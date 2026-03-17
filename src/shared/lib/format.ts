// 파일크기 포맷터
export const formatSize = (kb: number) => {
  if (kb >= 1024 ** 2) return `${(kb / 1024 ** 2).toFixed(1)}GB`;
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)}MB`;
  return `${kb.toFixed(1)}KB`;
};

// 재생시간 포맷터 (초 → 시:분:초)
export const formatDuration = (seconds: number) => {
  const hors = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hors}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
