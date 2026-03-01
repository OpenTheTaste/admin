export type UploadStatus =
  | "ORIGIN_UPLOADED" // s3 업로드 완료
  | "TRANSCODING" // 트랜스코딩 중
  | "UPLOADING" // 트랜스코딩된 파일 S3 업로드 중
  | "COMPLETED"; // 전체 완료

export interface UploadTask {
  id: number;
  fileName: string;
  fileSize: number;
  uploader: string;
  status: UploadStatus;
  progress: number;
}

export const mockAdminUploadStatus: UploadTask[] = [
  {
    id: 1,
    fileName: "파묘_Final_Main.mp4",
    fileSize: 12_500_000_000,
    uploader: "editor_kim",
    status: "TRANSCODING",
    progress: 45,
  },
  {
    id: 2,
    fileName: "서울의봄_고화질_export.mov",
    fileSize: 18_200_000_000,
    uploader: "admin_lee",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: 3,
    fileName: "범죄도시4_Trailer.mp4",
    fileSize: 5_400_000_000,
    uploader: "editor_park",
    status: "UPLOADING",
    progress: 82,
  },
  {
    id: 4,
    fileName: "인사이드아웃2_KR_Sub.mkv",
    fileSize: 3_100_000_000,
    uploader: "editor_kim",
    status: "ORIGIN_UPLOADED",
    progress: 0,
  },
  {
    id: 5,
    fileName: "데드풀과울버린_Teaser.mp4",
    fileSize: 1_200_000_000,
    uploader: "admin_lee",
    status: "TRANSCODING",
    progress: 15,
  },
  {
    id: 6,
    fileName: "듄_파트2_Main_4K.mov",
    fileSize: 25_700_000_000,
    uploader: "editor_park",
    status: "UPLOADING",
    progress: 30,
  },
  {
    id: 7,
    fileName: "에이리언_로물루스_Clip.mp4",
    fileSize: 850_000_000,
    uploader: "editor_kim",
    status: "COMPLETED",
    progress: 100,
  },
];
