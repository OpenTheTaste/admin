import { AdminVideoContentsUploadButton } from "@features/video-contents-manage/components";
import { AdminTitle } from "@layouts";

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
