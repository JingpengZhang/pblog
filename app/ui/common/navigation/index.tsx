"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const menus = [
    {
      name: "首页",
      path: "/",
    },
    {
      name: "博客",
      path: "/articles",
    },
    {
      name: "项目",
      path: "/projects",
    },
    {
      name: "友链",
      path: "/friends",
    },
  ];

  return (
    <section className="sticky top-0 bg-[#1a1a1a] h-20 border-y border-[#222] z-50">
      <div className="w-page mx-auto flex items-center h-full justify-between">
        <div className="w-[200px]"></div>
        <div className="flex h-full items-center">
          <ul className="flex items-center gap-x-4">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  href={menu.path}
                  className={[
                    " h-12 flex items-center px-7 border",
                    pathname === menu.path
                      ? "text-white bg-[#141414] border-[#333333] rounded-[10px]"
                      : "text-[#7E7E81] border-transparent",
                  ].join(" ")}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
            <li></li>
          </ul>
        </div>
        <div className="w-[200px]"></div>
      </div>
    </section>
  );
};

export default Navigation;
