import Flex from "@/components/Flex";
import Icon from "@/components/icon";
import PButton from "@/components/p-button";
import PCard from "@/components/p-card";
import {
  Params,
  useCreateFolder,
} from "@/hooks/requests/folder/use-create-folder";
import { useDeleteFolder } from "@/hooks/requests/folder/use-delete-folder";
import { useGetFolderChildren } from "@/hooks/requests/folder/use-get-folder-children";
import { useUpdateFolder } from "@/hooks/requests/folder/use-update-folder";
import { Folder } from "@/types/entity/folder";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ScrollShadow,
  Spinner,
} from "@nextui-org/react";
import { useBoolean, useMemoizedFn, useSetState } from "ahooks";
import React, { useRef, useState } from "react";

/**
 * 本组件 hook
 */
export const useFolderContainer = (
  _current: Folder["id"],
  subFolders: Folder[],
  parent: Folder["id"] = 0,
) => {
  // 当前文件夹
  const [current, setCurrent] = useState<Folder["id"]>(_current || 0);

  // 切换文件夹
  const to = useMemoizedFn((id: Folder["id"]) => {
    setCurrent(id);
  });

  // 返回上级文件夹
  const back = useMemoizedFn(() => {
    setCurrent(parent);
  });

  return {
    current,
    to,
    subFolders,
    parent,
    back,
  };
};

type Props = { refresh: () => void; loading: boolean } & ReturnType<
  typeof useFolderContainer
>;

const FolderContainer: React.FC<Props> = (props) => {
  // 文件夹参数
  const [cuParams, setCUParams] = useSetState<Params>({
    name: "新建文件夹",
  });

  // 当前编辑的文件夹 id
  const [updateId, setUpdateId] = useState<Folder["id"]>(-1);

  // 重命名文件夹
  const toRenameFolder = useMemoizedFn((item: Folder) => {
    setUpdateId(item.id);
    setCUParams({ name: item.name });
  });

  // 修改文件夹的请求 hook
  const { run: runUpdate, loading: updateLoading } = useUpdateFolder(
    updateId,
    cuParams,
    {
      onSuccess: () => {
        setUpdateId(-1);
        props.refresh();
      },
    },
  );

  // 新建文件夹请求 hook
  const { run: runCreate, loading: createLoading } = useCreateFolder(
    props.current,
    cuParams,
    {
      onSuccess: () => {
        setIsCreate.setFalse();
        props.refresh();
      },
    },
  );

  const createInputRef = useRef<HTMLInputElement>(null);

  // 是否在新建
  const [isCreate, setIsCreate] = useBoolean(false);

  // 进入新建模式
  const toCreate = useMemoizedFn(() => {
    setCUParams({
      name: "未命名文件夹",
    });
    if (createInputRef.current) {
      console.log("ddss");

      createInputRef.current.focus();
    }
    setIsCreate.setTrue();
  });

  // 删除文件夹 hook
  const delRequest = useDeleteFolder({
    onSuccess: () => {
      // 重新请求列表
      props.refresh();
    },
  });

  return (
    <Flex
      vertical
      className=" flex-shrink-0 border-r h-full border-zinc-700 w-60"
    >
      <Flex align="center" justify="space-between" className="p-6 h-14">
        <span>文件夹</span>
        <Flex align="center">
          <PButton
            isDisabled={props.current === 0}
            onClick={props.back}
            mini
            size="sm"
            variant="light"
            radius="full"
          >
            <Icon name="ChevronLeftOutline" />
          </PButton>
          <PButton
            onClick={toCreate}
            mini
            size="sm"
            variant="light"
            radius="full"
          >
            <Icon name="FolderPlusOutline" />
          </PButton>
        </Flex>
      </Flex>

      {props.loading || updateLoading || createLoading || delRequest.loading ? (
        <Spinner size="sm" className="mt-10" />
      ) : (
        <ScrollShadow className="w-full">
          {props.subFolders.map((item) => (
            <PCard
              itemStyle
              className="w-full"
              onClick={() => {
                // 如果未在重命名该文件夹，就跳转
                props.to(item.id);
              }}
              isPressable={updateId !== item.id}
              key={item.id}
            >
              <Flex
                align="center"
                justify="space-between"
                className="pl-6 pr-2 h-12 text-sm w-full rounded cursor-pointer"
              >
                <Flex align="center">
                  <Icon className="mr-2" name="FolderSolid" />
                  {item.id === updateId ? (
                    <Input
                      value={cuParams.name}
                      onChange={(e) => setCUParams({ name: e.target.value })}
                      onBlur={runUpdate}
                      size="sm"
                    />
                  ) : (
                    <span>{item.name}</span>
                  )}
                </Flex>
                <Flex>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="min-w-0"
                        size="sm"
                        variant="light"
                        radius="full"
                      >
                        <Icon name="EllipsisVerticalOutline" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => toRenameFolder(item)}
                        key="rename"
                      >
                        重命名
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => delRequest.run({ data: item.id })}
                        className="text-danger"
                        color="danger"
                        key="delete"
                      >
                        删除
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Flex>
              </Flex>
            </PCard>
          ))}

          {/* 新建文件夹控件 */}
          <PCard
            itemStyle
            className={`w-full ${isCreate ? "flex" : "hidden"}`}
            isPressable={false}
          >
            <Flex
              align="center"
              justify="space-between"
              className="pl-6 pr-2 h-12 text-sm w-full rounded cursor-pointer"
            >
              <Flex align="center">
                <Icon className="mr-2" name="FolderSolid" />
                <Input
                  ref={createInputRef}
                  value={cuParams.name}
                  onChange={(e) => setCUParams({ name: e.target.value })}
                  onBlur={runCreate}
                  size="sm"
                />
              </Flex>
            </Flex>
          </PCard>

          {props.subFolders.length === 0 && !isCreate && (
            <Flex align="center" justify="center" className="h-8">
              <span className="text-xs text-zinc-700">暂无</span>
            </Flex>
          )}
        </ScrollShadow>
      )}
    </Flex>
  );
};

export default FolderContainer;
