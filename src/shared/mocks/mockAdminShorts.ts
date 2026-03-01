import { Category, VideoFileMeta } from "@shared/types";

export interface ShortsType extends VideoFileMeta {
  id: number;
  title: string;
  description: string;
  cast: string[];
  originalContents: {
    originalId: number;
    originalTitle: string;
    category: Category;
    tags: string[];
  };
  isPublic: boolean;
  uploadDate: string;
  uploader: string;
  bookmarkCount: number;
  thumbnailShorts: string;
}
export const mockAdminShorts: ShortsType[] = [
  {
    id: 1,
    title: "동은의 첫 복수 계획",
    description: "더글로리 시즌1에서 동은이 복수를 결심하는 결정적인 장면.",
    cast: ["송혜교", "이도현"],
    originalContents: {
      originalId: 1,
      originalTitle: "더 글로리 시즌1",
      category: "드라마",
      tags: ["스릴러"],
    },
    isPublic: true,
    uploadDate: "2026-02-09",
    uploader: "에디터_김철수",
    bookmarkCount: 8543,

    name: "더글로리_shorts_01.mp4",
    size: 120_000_000, // 약 114MB
    duration: "00:03:13",
    thumbnailShorts: "/images/recommendcontent_img.png",
  },
  {
    id: 2,
    title: "마석도의 한 방",
    description: "범죄도시에서 마석도의 통쾌한 액션 장면을 담은 숏폼.",
    cast: ["마동석"],
    originalContents: {
      originalId: 3,
      originalTitle: "범죄도시",
      category: "영화",
      tags: ["액션"],
    },
    isPublic: true,
    uploadDate: "2026-02-05",
    uploader: "에디터_이수진",
    bookmarkCount: 4210,

    name: "범죄도시_shorts_01.mp4",
    size: 95_000_000, // 약 90MB
    duration: "00:02:45",
    thumbnailShorts: "/images/recommendcontent_img.png",
  },
  {
    id: 3,
    title: "우영우의 법정 명장면",
    description: "이상한 변호사 우영우에서 인상 깊었던 변론 장면.",
    cast: ["박은빈"],
    originalContents: {
      originalId: 5,
      originalTitle: "이상한 변호사 우영우 시즌1",
      category: "드라마",
      tags: ["법정"],
    },
    isPublic: false,
    uploadDate: "2026-01-28",
    uploader: "에디터_이수진",
    bookmarkCount: 3120,

    name: "우영우_shorts_01.mp4",
    size: 110_000_000, // 약 105MB
    duration: "00:02:58",
    thumbnailShorts: "/images/recommendcontent_img.png",
  },
  {
    id: 4,
    title: "오징어게임 첫 게임 시작",
    description: "오징어게임에서 참가자들이 첫 번째 게임에 참여하는 장면.",
    cast: ["이정재", "박해수"],
    originalContents: {
      originalId: 4,
      originalTitle: "오징어 게임 시즌1",
      category: "드라마",
      tags: ["스릴러"],
    },
    isPublic: true,
    uploadDate: "2026-02-01",
    uploader: "에디터_김철수",
    bookmarkCount: 9821,

    name: "오징어게임_shorts_01.mp4",
    size: 140_000_000, // 약 134MB
    duration: "00:03:40",
    thumbnailShorts: "/images/recommendcontent_img.png",
  },
];
