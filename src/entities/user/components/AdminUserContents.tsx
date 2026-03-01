import { AdminBadge } from "@shared/components";
import { mockAdminUsers, type UserType } from "@shared/mocks/mockAdminUsers";

const TYPE_STYLE_MAP: Record<UserType, string> = {
  관리자: "bg-ot-primary-400 text-ot-text",
  사용자: "bg-ot-primary-500 text-ot-text",
  에디터: "bg-ot-primary-200 text-ot-background",
  중지됨: "bg-ot-gray-900 text-ot-text",
};

interface AdminUserContentsProps {
  filterRole?: UserType | null;
}

export default function AdminUserContents({
  filterRole,
}: AdminUserContentsProps) {
  const data = filterRole
    ? mockAdminUsers.filter((user) => user.type === filterRole)
    : mockAdminUsers;

  return (
    <div className="mt-4 rounded-lg overflow-hidden">
      <table className="w-full text-ot-text">
        <colgroup>
          <col className="w-2/9" />
          <col className="w-3/9" />
          <col className="w-2/9" />
          <col className="w-2/9" />
        </colgroup>

        <thead className="bg-ot-gray-800 text-md font-bold">
          <tr>
            <th className="py-3">이름</th>
            <th>이메일</th>
            <th>역할</th>
            <th>가입일</th>
          </tr>
        </thead>

        <tbody className="bg-ot-gray-700 divide-y divide-ot-gray-800">
          {data.map((content) => (
            <tr
              key={content.id}
              className="hover:bg-ot-gray-700/30 transition-colors"
            >
              <td className="py-5 text-center">
                <div className="flex flex-col font-semibold">
                  <span>{content.name}</span>
                </div>
              </td>

              <td className="py-5 text-center">{content.email}</td>

              <td className="py-5 text-center">
                <AdminBadge
                  variant={content.type}
                  className={TYPE_STYLE_MAP[content.type]}
                />
              </td>

              <td className="py-5 text-center font-semibold text-sm">
                {content.signupDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
