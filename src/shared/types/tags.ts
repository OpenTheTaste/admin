export interface Tag {
  tagId: number;
  name: string;
}

export const TAGS: Record<number, Tag[]> = {
  // 드라마, 영화, 예능, 다큐
  1: [
    { tagId: 1, name: "로맨스" },
    { tagId: 2, name: "스릴러" },
    { tagId: 3, name: "추리" },
    { tagId: 4, name: "법정" },
    { tagId: 5, name: "의학" },
  ],
  2: [
    { tagId: 6, name: "액션" },
    { tagId: 7, name: "SF" },
    { tagId: 8, name: "코미디" },
    { tagId: 9, name: "공포" },
    { tagId: 10, name: "판타지" },
  ],

  3: [
    { tagId: 11, name: "토크쇼" },
    { tagId: 12, name: "리얼리티" },
    { tagId: 13, name: "음악" },
    { tagId: 14, name: "먹방" },
  ],
  4: [
    { tagId: 15, name: "자연" },
    { tagId: 16, name: "역사" },
    { tagId: 17, name: "과학" },
    { tagId: 18, name: "사회" },
  ],
};
