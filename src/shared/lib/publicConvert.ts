// UI용 한국어 -> API용 영어 변환
import { PublicStatus, PublicType } from "@shared/types";

export const toPublicStatus = (
  filter?: PublicType | null,
): PublicStatus | undefined => {
  if (filter === "공개") return "PUBLIC";
  if (filter === "비공개") return "PRIVATE";
  return undefined;
};
