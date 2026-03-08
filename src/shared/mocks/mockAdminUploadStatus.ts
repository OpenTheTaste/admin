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
  {
    id: 8,
    fileName: "오펜하이머_4K_Main.mkv",
    fileSize: 32_000_000_000,
    uploader: "admin_lee",
    status: "TRANSCODING",
    progress: 67,
  },
  {
    id: 9,
    fileName: "바비_Extended_Cut.mp4",
    fileSize: 8_900_000_000,
    uploader: "editor_park",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: 10,
    fileName: "킬러의보디가드2_KR.mp4",
    fileSize: 6_300_000_000,
    uploader: "editor_kim",
    status: "ORIGIN_UPLOADED",
    progress: 0,
  },
  {
    id: 11,
    fileName: "미션임파서블_데드레코닝.mov",
    fileSize: 21_400_000_000,
    uploader: "admin_lee",
    status: "UPLOADING",
    progress: 55,
  },
  {
    id: 12,
    fileName: "가디언즈3_Final.mp4",
    fileSize: 14_700_000_000,
    uploader: "editor_park",
    status: "TRANSCODING",
    progress: 88,
  },
  {
    id: 13,
    fileName: "스파이더맨_어크로스_4K.mkv",
    fileSize: 19_200_000_000,
    uploader: "editor_kim",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: 14,
    fileName: "존윅4_Theatrical.mp4",
    fileSize: 9_800_000_000,
    uploader: "admin_lee",
    status: "ORIGIN_UPLOADED",
    progress: 0,
  },
  {
    id: 15,
    fileName: "앤트맨3_Main_Export.mov",
    fileSize: 7_500_000_000,
    uploader: "editor_park",
    status: "UPLOADING",
    progress: 42,
  },
  {
    id: 16,
    fileName: "탑건_매버릭_4K.mp4",
    fileSize: 11_300_000_000,
    uploader: "editor_kim",
    status: "UPLOADING",
    progress: 71,
  },
  {
    id: 17,
    fileName: "아바타2_Extended.mkv",
    fileSize: 38_500_000_000,
    uploader: "admin_lee",
    status: "UPLOADING",
    progress: 19,
  },
  {
    id: 18,
    fileName: "블랙팬서2_Final.mp4",
    fileSize: 13_200_000_000,
    uploader: "editor_park",
    status: "UPLOADING",
    progress: 63,
  },
  {
    id: 19,
    fileName: "닥터스트레인지2_Main.mov",
    fileSize: 9_100_000_000,
    uploader: "editor_kim",
    status: "UPLOADING",
    progress: 37,
  },
  {
    id: 20,
    fileName: "토르4_Theatrical.mp4",
    fileSize: 7_800_000_000,
    uploader: "admin_lee",
    status: "UPLOADING",
    progress: 91,
  },
  {
    id: 21,
    fileName: "범죄도시3_Main_4K.mp4",
    fileSize: 5_600_000_000,
    uploader: "editor_park",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: 22,
    fileName: "헌트_Director_Cut.mkv",
    fileSize: 4_200_000_000,
    uploader: "editor_kim",
    status: "COMPLETED",
    progress: 100,
  },
];
