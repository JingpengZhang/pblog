import Image from "next/image";
import Flex from "../Flex";
import PButton from "../p-button";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import React from "react";
import FileUtil from "@/utils/file-util";
import dayjs from "dayjs";
import { useFileDetailDrawer } from "@/hooks/component/use-file-detail-drawer";
import copy from "copy-to-clipboard";
import { useMemoizedFn } from "ahooks";
import { toast } from "react-toastify";
import { filesize } from "filesize";

type Props = {} & ReturnType<typeof useFileDetailDrawer>;

const FileDetailDrawer: React.FC<Props> = (props) => {
  // 复制文件链接
  const copyPath = useMemoizedFn((path: string) => {
    copy(path);

    toast.success("已复制到剪贴板", {
      position: "bottom-right",
    });
  });

  return (
    <Drawer
      open={props.visible}
      onClose={props.hide}
      direction="right"
      style={{ width: 600 }}
    >
      {props.data && (
        <Flex vertical className="h-full bg-zinc-900 w-full px-6 pb-6">
          <div>
            <Flex align="center" className="h-14">
              <p className="">{props.data.filename}</p>
            </Flex>
            <Flex className="w-full aspect-video rounded overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={FileUtil.getFileRealURL(props.data.path)}
                alt="图片"
                width={300}
                height={300}
              />
            </Flex>
          </div>
          <Flex vertical className="mt-6">
            <Flex gap={14}>
              <PButton variant="flat" size="sm" color="primary">
                下载
              </PButton>

              <PButton
                onClick={() =>
                  copyPath(FileUtil.getFileRealURL(props.data!.path))
                }
                variant="flat"
                size="sm"
                color="primary"
              >
                复制文件地址
              </PButton>
            </Flex>

            <Flex align="center" className="text-sm mt-6">
              <span className="text-zinc-500 mr-4 ">描述:</span>
              <p>{props.data.description}</p>
            </Flex>

            <Flex align="center" className="mt-4">
              <Flex align="center" className="text-sm flex-1">
                <span className="text-zinc-500 mr-4">分辨率:</span>
                <p>1920 * 1080</p>
              </Flex>
            </Flex>

            <Flex align="center" className="mt-4">
              <Flex align="center" className="text-sm flex-1">
                <span className="text-zinc-500 mr-4">文件大小:</span>
                <p>{filesize(props.data.filesize)}</p>
              </Flex>
              <Flex align="center" className="text-sm flex-1">
                <span className="text-zinc-500 mr-4">后缀:</span>
                <p>{props.data.extension}</p>
              </Flex>
            </Flex>

            <Flex align="center" className="mt-4">
              <Flex align="center" className="text-sm flex-1">
                <span className="text-zinc-500 mr-4">创建日期:</span>
                <p>
                  {dayjs(props.data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </Flex>
              <Flex align="center" className="text-sm flex-1">
                <span className="text-zinc-500 mr-4">修改日期:</span>
                <p>
                  {dayjs(props.data.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Drawer>
  );
};

export default FileDetailDrawer;
