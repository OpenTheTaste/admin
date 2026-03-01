import { Suspense } from "react";
import { AdminSeriesContents } from "@features/series-manage/components";
import { AdminSearch } from "@shared/components";

export default function SeiresPage() {
  return (
    <>
      <AdminSearch placeholder="시리즈 제목을 입력해주세요." />
      <Suspense fallback={null}>
        {" "}
        {/*Pre-rendering 지금은 아무것도 없음*/}
        <AdminSeriesContents />
      </Suspense>
    </>
  );
}
