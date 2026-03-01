"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Drama,
  LineChart,
  SquarePlay,
  Users,
} from "lucide-react";
import { cn } from "@shared/utils";

const menus = [
  {
    name: "시리즈 관리",
    href: "/series",
    icon: Drama,
  },
  {
    name: "콘텐츠 관리",
    href: "/video-contents",
    icon: Clapperboard,
  },
  {
    name: "숏폼 관리",
    href: "/shorts",
    icon: SquarePlay,
  },
  {
    name: "사용자 관리",
    href: "/user",
    icon: Users,
  },
  {
    name: "모니터링",
    href: "/monitoring",
    icon: LineChart,
  },
];

// 실제 user api 데이터 들어갈 자리
const user = {
  name: "관리자",
  email: "ott@gmail.com",
};

export const AdminSideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col bg-ot-gray-800 w-1/7">
      <Link href="/series" className="block ml-3 my-4 px-3">
        <span className="font-bold text-4xl text-ot-text hover:text-ot-gray-600">
          O+T
        </span>
      </Link>

      <nav className="flex flex-col px-3">
        {menus.map((menu) => {
          const isActive = pathname.startsWith(menu.href);
          const Icon = menu.icon;

          return (
            <Link
              href={menu.href}
              key={menu.href}
              className={cn(
                "py-3 px-3 flex items-center rounded-lg cursor-pointer transition-all duration-200",
                isActive
                  ? "bg-ot-primary-gradient text-ot-text font-bold"
                  : "text-ot-text hover:bg-ot-gray-700",
              )}
            >
              <Icon size={22} className="mr-3 stroke-ot-text" />
              <span className="text-md">{menu.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto py-3 border-t border-ot-gray-600 px-4 flex flex-col justify-center">
        <p className="font-semibold text-ot-text text-md">{user.name}</p>
        <p className="text-ot-placeholder text-sm">{user.email}</p>
      </div>
    </aside>
  );
};
