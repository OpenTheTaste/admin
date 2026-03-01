import { AdminTitle } from "@layouts";
import { AdminVideoContentsUploadButton } from "@features/video-contents-manage/components";

export default function VideoContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="콘텐츠 관리"
        description="콘텐츠를 관리합니다"
        action={<AdminVideoContentsUploadButton />}
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
