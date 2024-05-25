"use client";

import { MenuItem } from "@/app/lib/definitions";
import Icon from "@/components/icon";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useCreation, useDynamicList } from "ahooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menus = useDynamicList<MenuItem>([
    {
      icon: {
        name: "PencilOutline",
      },
      name: "写文章",
      path: "write",
    },
    {
      icon: {
        name: "FoldersLibraryOutline",
      },
      name: "文件管理",
      path: "files",
    },
    {
      icon: {
        name: "TagOutline",
      },
      name: "分类管理",
      path: "categories",
    },
    {
      icon: {
        name: "NewsPaperOutline",
      },
      name: "文章管理",
      path: "articles",
    },
  ]);

  // 当前页面名称
  const currentPageTitle = useCreation(() => {
    return menus.list.find((v) => pathname.endsWith(v.path))?.name || "";
  }, [pathname]);

  return (
    <section className="h-screen w-screen flex flex-col">
      <div className="h-16 border-b flex-shrink-0 border-zinc-700 bg-zinc-900 flex items-center justify-between px-4"></div>
      <div className="flex-grow flex overflow-y-auto">
        <div className="h-full w-52 border-r bg-zinc-900 border-zinc-700 flex flex-col justify-between">
          <ul className="w-full p-3 text-sm text-zinc-300 select-none">
            {menus.list.map((item, index) => (
              <li key={index} className="h-11">
                <Link
                  href={item.path}
                  className={[
                    "h-full rounded bg-transparent hover:bg-zinc-800 w-full flex justify-between items-center",
                    pathname.endsWith(item.path)
                      ? "text-primary-400 bg-zinc-800"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-center h-full">
                    <div className="flex items-center h-full aspect-square justify-center">
                      <Icon {...item.icon} />
                    </div>

                    <span>{item.name}</span>
                  </div>
                  <div></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <section className="flex-grow bg-zinc-800 flex flex-col px-6 overflow-y-auto">
          <div className="text-white h-16 flex items-center flex-shrink-0">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Icon name="ListBulletOutline" />
              </BreadcrumbItem>
              <BreadcrumbItem>{currentPageTitle}</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="bg-zinc-900 w-full rounded-md flex-grow overflow-y-auto">
            {children}
          </div>

          <div className="flex items-center justify-center h-12 text-sm text-zinc-400 flex-shrink-0">
            PBLOG
          </div>
        </section>
      </div>
    </section>
  );
}
