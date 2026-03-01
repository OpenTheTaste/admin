import { ReactNode } from "react";

export interface AdminTitleProps {
  title: string;
  description?: string;
  action?: ReactNode; // 버튼 영역
}

export default function AdminTitle({
  title,
  description,
  action,
}: AdminTitleProps) {
  return (
    <div className="px-12 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{title}</p>
          {description && (
            <p className="text-md mt-2 text-ot-placeholder">{description}</p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
