import { Category } from "@shared/types";

export interface AdminSeries {
  id: number;
  thumbnailVertical: string;
  thumbnailHorizontal: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  isPublic: boolean;
  uploader: string;
  bookmarkCount: number;
  cast: string[];
}

export const mockAdminSeries: AdminSeries[] = [
  {
    id: 1,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "더 글로리",
    description:
      "학교 폭력으로 인한 상처를 안고 살아온 동은이 긴 시간 동안 치밀하게 준비한 복수극이 시작된다.",
    category: "드라마",
    tags: ["스릴러"],
    isPublic: true,
    uploader: "에디터_김철수",
    bookmarkCount: 8543,
    cast: ["이정재", "황정민", "박정민"],
  },
  {
    id: 2,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "범죄도시",
    description:
      "전설적인 괴물 형사 마석도와 서울 광역수사대가 신종 범죄 조직을 일망타진하는 이야기.",
    category: "영화",
    tags: ["액션"],
    isPublic: true,
    uploader: "에디터_이수진",
    bookmarkCount: 5210,
    cast: ["마동석", "손석구"],
  },
  {
    id: 3,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "오징어 게임",
    description:
      "456억 원의 상금을 위해 목숨을 건 생존 게임에 참가한 사람들의 이야기.",
    category: "드라마",
    tags: ["스릴러"],
    isPublic: true,
    uploader: "에디터_김철수",
    bookmarkCount: 12034,
    cast: ["이정재", "박해수", "오영수"],
  },
  {
    id: 4,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "이상한 변호사 우영우",
    description: "자폐 스펙트럼 장애를 가진 천재 변호사 우영우의 성장 드라마.",
    category: "드라마",
    tags: ["법정"],
    isPublic: false,
    uploader: "에디터_이수진",
    bookmarkCount: 7821,
    cast: ["박은빈", "강태오"],
  },
  {
    id: 5,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "무한도전",
    description:
      "대한민국 최장수 예능 프로그램으로 다양한 도전과 웃음을 선사한다.",
    category: "예능",
    tags: ["리얼리티"],
    isPublic: true,
    uploader: "에디터_박유빈",
    bookmarkCount: 3290,
    cast: ["유재석", "박명수", "정준하"],
  },
  {
    id: 6,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "전지적 참견 시점",
    description: "매니저와 연예인의 24시간 밀착 관찰 예능 프로그램.",
    category: "예능",
    tags: ["리얼리티"],
    isPublic: true,
    uploader: "에디터_박유빈",
    bookmarkCount: 2100,
    cast: ["이영자", "이상민"],
  },
  {
    id: 7,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "태양의 후예",
    description: "군인과 의사의 위험하고 아름다운 사랑 이야기.",
    category: "드라마",
    tags: ["로맨스"],
    isPublic: true,
    uploader: "에디터_김철수",
    bookmarkCount: 9456,
    cast: ["송중기", "송혜교"],
  },
  {
    id: 8,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "기생충",
    description:
      "전원 백수인 기택 가족이 부유한 박 사장 가족에게 스며들면서 벌어지는 이야기.",
    category: "영화",
    tags: ["스릴러"],
    isPublic: false,
    uploader: "에디터_이수진",
    bookmarkCount: 6732,
    cast: ["송강호", "이선균", "조여정"],
  },
  {
    id: 9,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "2023 WBC 하이라이트",
    description: "월드 베이스볼 클래식 2023 주요 경기 하이라이트 모음.",
    category: "스포츠",
    tags: ["야구"],
    isPublic: true,
    uploader: "에디터_박유빈",
    bookmarkCount: 1540,
    cast: [],
  },
  {
    id: 10,
    thumbnailVertical: "/images/recent_img.png",
    thumbnailHorizontal: "/images/recommendcontent_img.png",
    title: "우주의 탄생",
    description:
      "빅뱅부터 현재까지, 우주의 역사를 과학적으로 탐구하는 다큐멘터리.",
    category: "다큐",
    tags: ["과학"],
    isPublic: true,
    uploader: "에디터_김철수",
    bookmarkCount: 890,
    cast: [],
  },
];
