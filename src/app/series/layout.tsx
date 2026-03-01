import { AdminSeriesUploadButton } from "@features/series-manage/components";
import { AdminTitle } from "@layouts";

export default function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="시리즈 관리"
        description="콘텐츠 시리즈를 관리합니다"
        action={<AdminSeriesUploadButton />}
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
