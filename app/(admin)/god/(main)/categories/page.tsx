"use client";

import { Category } from "@/app/lib/definitions";
import {
  Button,
  Card,
  CardBody,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import dayjs from "dayjs";
import CreateCategoryModal from "./_components/create-category-modal";
import Icon from "@/components/icon";

export default function Page() {
  const categories: Category[] = [
    // {
    //   id: 1,
    //   name: "Vue",
    //   icon: {
    //     name: "VueSolid",
    //     color: "#00af7a",
    //     size: 16,
    //     strokeWidth: 1,
    //   },
    //   create_at: 1714556254,
    //   update_at: 1714556254,
    //   article_count: 243,
    // },
    //
    // {
    //   id: 2,
    //   name: "React",
    //   icon: {
    //     name: "ReactSolid",
    //     color: "#00d2fb",
    //     size: 16,
    //     strokeWidth: 1,
    //   },
    //   create_at: 1714556254,
    //   update_at: 1714556254,
    //   article_count: 243,
    // },
  ];

  const categoryModal = useDisclosure();

  return (
    <>
      <h1>分类管理</h1>

      <ul className="grid grid-cols-5 mt-5 gap-4">
        <li>
          <Card
            isPressable
            onPress={categoryModal.onOpen}
            className="w-full h-full h-40 border border-zinc-700 rounded text-zinc-400"
          >
            <CardBody className="flex flex-col justify-center items-center">
              <Icon name="PlusSolid" size={20} />
              <span className="text-sm mt-5">点击创建分类</span>
            </CardBody>
          </Card>
        </li>
        {categories.map((item) => (
          <li
            key={item.id}
            className="border rounded h-40 p-3 border-zinc-700 flex flex-col justify-between relative"
          >
            <Icon className="absolute top-4 right-4" {...item.icon} size={32} />
            <div>
              <span>{item.name}</span>
              <p className="text-xs text-zinc-400 mt-1">
                {dayjs(item.create_at).format("YYYY-MM-DD hh:mm:ss")}
              </p>

              <ul className="grid grid-cols-2 text-xs mt-4">
                <li>
                  <span className="text-zinc-400 mr-2">文章总数</span>
                  <span className="text-zinc-300">{item.article_count}</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end w-full">
              <Button size="sm" radius="sm">
                删除
              </Button>
              <Spacer />
              <Button size="sm" radius="sm" color="primary">
                编辑
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <CreateCategoryModal {...categoryModal} />
    </>
  );
}
