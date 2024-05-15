"use client";

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
import { useCategoryListScroll } from "@/hooks/requests/category/use-category-list-scroll";
import { useRef } from "react";

export default function Page() {
  // 数据列表 dom ref
  const ref = useRef<HTMLDivElement>(null);

  // 获取分类列表
  const { data, reload, noMore } = useCategoryListScroll({
    pageSize: 10,
    target: ref,
  });

  const categoryModal = useDisclosure();

  return (
    <>
      <h1>分类管理</h1>

      <div
        ref={ref}
        style={{ height: "calc(100% - 30px)" }}
        className="overflow-y-auto pr-3"
      >
        <ul className="grid grid-cols-5 mt-5 gap-4 overflow-y-auto pr-3">
          <li>
            <Card
              isPressable
              onPress={categoryModal.onOpen}
              className="w-full h-40 border border-zinc-700 rounded text-zinc-400"
            >
              <CardBody className="flex flex-col justify-center items-center">
                <Icon name="PlusSolid" size={20} />
                <span className="text-sm mt-5">点击创建分类</span>
              </CardBody>
            </Card>
          </li>
          {data &&
            data.list.map((item) => (
              <li
                key={item.id}
                className="border rounded h-40 p-3 border-zinc-700 flex flex-col justify-between relative"
              >
                <Icon className="absolute top-4 right-4" {...item.icon} />
                <div>
                  <span>{item.name}</span>
                  <p className="text-xs text-zinc-400 mt-1">
                    {dayjs(item.create_at).format("YYYY-MM-DD hh:mm:ss")}
                  </p>

                  <ul className="grid grid-cols-2 text-xs mt-4">
                    <li>
                      <span className="text-zinc-400 mr-2">文章总数</span>
                      <span className="text-zinc-300">
                        {item.article_count}
                      </span>
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

        {noMore && (
          <div className="text-center mt-6 mb-3 text-xs text-stone-600">
            没有了哦
          </div>
        )}
      </div>

      <CreateCategoryModal {...categoryModal} onSuccess={reload} />
    </>
  );
}
