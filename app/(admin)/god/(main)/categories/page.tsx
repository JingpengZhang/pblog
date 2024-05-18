"use client";

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import dayjs from "dayjs";
import Icon from "@/components/icon";
import { useCategoryListScroll } from "@/hooks/requests/category/use-category-list-scroll";
import { useRef } from "react";
import ConfirmPop from "@/components/confirm-pop";
import { useDeleteCategory } from "@/hooks/requests/category/use-delete-category";
import Flex from "@/components/Flex";
import { useSelections } from "ahooks";
import { useCUModal } from "@/hooks/component/use-cu-modal";
import { Category } from "@/types/entity/category";
import CategoryCUModal from "./_components/category-cu-modal";

export default function Page() {
  // 数据列表 dom ref
  const ref = useRef<HTMLDivElement>(null);

  // 获取分类列表
  const { data, reload, noMore } = useCategoryListScroll({
    pageSize: 10,
    target: ref,
  });

  const categoryCUModal = useCUModal<Category>({
    onSuccess: () => {
      reload();
    },
  });

  // 删除分类
  const { run: delRun, loading: delLoading } = useDeleteCategory({
    onSuccess: () => {
      reload();
    },
  });

  // 多选
  const selections = useSelections(data?.list || []);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="h-16 flex-shrink-0 px-5"
      >
        <h1>分类管理</h1>

        <Flex gap={20}>
          <Checkbox
            color="danger"
            checked={selections.allSelected}
            onValueChange={(v) =>
              v ? selections.selectAll() : selections.unSelectAll()
            }
            isIndeterminate={selections.partiallySelected}
          >
            全选
          </Checkbox>
          <ConfirmPop
            onConfirm={() =>
              delRun({
                data: selections.selected.map((v) => v.id),
              })
            }
          >
            <Button
              size="sm"
              radius="sm"
              color="danger"
              isDisabled={selections.selected.length === 0}
            >
              删除所选
            </Button>
          </ConfirmPop>
        </Flex>
      </Flex>

      <ScrollShadow
        ref={ref}
        style={{ height: "calc(100% - 70px)" }}
        className="overflow-y-auto pr-2 pl-5"
      >
        <ul className="grid md:grid-cols-3  xl:grid-cols-5 mt-5 gap-4 overflow-y-auto pr-3">
          <li>
            <Card
              isPressable
              onPress={categoryCUModal.create}
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
                className="group border rounded h-40 p-3 border-zinc-700 flex flex-col justify-between relative"
              >
                <Icon className="absolute top-4 right-4" {...item.icon} />
                <div>
                  <span>{item.name}</span>
                  <p className="text-xs text-zinc-400 mt-1">
                    {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
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

                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Checkbox
                      onValueChange={(v) =>
                        v ? selections.select(item) : selections.unSelect(item)
                      }
                      isSelected={selections.isSelected(item)}
                      className={`${selections.isSelected(item) ? "" : "hidden group-hover:flex"}`}
                      icon={<Icon name="MinusOutline" />}
                      radius="full"
                      color="danger"
                    />
                  </Flex>
                  <Flex align="center">
                    <ConfirmPop
                      loading={delLoading}
                      onConfirm={() => delRun({ data: item.id })}
                    >
                      <Button size="sm" radius="sm">
                        删除
                      </Button>
                    </ConfirmPop>
                    <Spacer />
                    <Button
                      onClick={() => categoryCUModal.update(item)}
                      size="sm"
                      radius="sm"
                      color="primary"
                    >
                      编辑
                    </Button>
                  </Flex>
                </Flex>
              </li>
            ))}
        </ul>

        {noMore && (
          <div className="text-center mt-6 mb-6 text-xs text-stone-600">
            没有了哦
          </div>
        )}
      </ScrollShadow>

      <CategoryCUModal {...categoryCUModal} />
    </>
  );
}
