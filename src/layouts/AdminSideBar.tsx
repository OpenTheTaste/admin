"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Drama,
  LineChart,
  LogOut,
  SquarePlay,
  Users,
} from "lucide-react";
import { logoutApi } from "@entities/auth/apis";
import { ROLES } from "@shared/constants";
import { useAuthStore } from "@shared/store";
import { cn } from "@shared/utils";

const menus = [
  {
    name: "시리즈 관리",
    href: "/series",
    icon: Drama,
    roles: [ROLES.ADMIN],
  },
  {
    name: "콘텐츠 관리",
    href: "/video-contents",
    icon: Clapperboard,
    roles: [ROLES.ADMIN],
  },
  {
    name: "숏폼 관리",
    href: "/shorts",
    icon: SquarePlay,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
  },
  {
    name: "전체 유저 관리",
    href: "/user",
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    name: "모니터링",
    href: "/monitoring",
    icon: LineChart,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
  },
];

export const AdminSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { role, email, nickname, clearAuth } = useAuthStore();

  const filteredMenus = menus.filter((menu) =>
    role ? menu.roles.includes(role) : false,
  );

  const handleLogout = async () => {
    try {
      await logoutApi();
      clearAuth();
      router.push("/auth/login");
    } catch (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <aside className="flex flex-col bg-ot-gray-800 w-1/7">
      <Link href="/series" className="block ml-3 my-4 px-3">
        <span className="font-bold text-3xl text-ot-text hover:text-ot-gray-600">
          O+T 관리
        </span>
      </Link>

      <nav className="flex flex-col px-3">
        {filteredMenus.map((menu) => {
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

      <div className="mt-auto py-3 border-t border-ot-gray-600 px-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-ot-text text-md">{nickname}</p>
          <p className="text-ot-placeholder text-sm">{email}</p>
        </div>
        <button className="cursor-pointer" onClick={handleLogout}>
          <LogOut
            className="stroke-ot-text hover:stroke-ot-gray-600"
            size={22}
          />
        </button>
      </div>
    </aside>
  );
};
