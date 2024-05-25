"use client";

import Flex from "@/components/Flex";
import Icon from "@/components/icon";
import PButton from "@/components/p-button";
import PCard from "@/components/p-card";
import Image from "next/image";
import FileUtil from "@/utils/file-util";
import { useFileDetailDrawer } from "@/hooks/component/use-file-detail-drawer";
import FileDetailDrawer from "@/components/file-detail-drawer";
import { useGetFolderChildren } from "@/hooks/requests/folder/use-get-folder-children";
import FolderContainer, {
  useFolderContainer,
} from "./_components/folder-container";
import { useUpdate, useUpdateEffect } from "ahooks";
import FileUploadModal, {
  useFileUploader,
} from "@/components/file-uploader-modal";

export default function Page() {
  // 文件列表
  const { params, setParams, req: listReq } = useGetFolderChildren();

  // 文件夹列表 hook

  const folderContainer = useFolderContainer(
    params.id,
    listReq.data?.folders || [],
    listReq.data?.parentFolderId || 0,
  );

  useUpdateEffect(() => {
    if (folderContainer.current >= 0) {
      setParams({ id: folderContainer.current });
    }
  }, [folderContainer.current]);

  // 文件详情
  const fileDetailDrawer = useFileDetailDrawer();

  // 文件上传弹窗
  const fileUploader = useFileUploader();

  return (
    <>
      <Flex className="h-full w-full">
        {/* 文件夹树 */}
        <FolderContainer
          refresh={listReq.refresh}
          loading={listReq.loading}
          {...folderContainer}
        />
        {/* 文件 */}
        <Flex vertical className="flex-grow w-full">
          <Flex
            align="center"
            justify="space-between"
            className="p-6 h-14 w-full flex-shrink-0"
          >
            <span>文件列表</span>
            <Flex align="center">
              <PButton
                onClick={fileUploader.onOpen}
                mini
                size="sm"
                variant="light"
                radius="full"
              >
                <Icon name="CloudUploadSolid" />
              </PButton>
            </Flex>
          </Flex>

          <Flex gap={20} className="flex-shrink-0 px-6 ">
            {listReq.data?.files.map((item) => (
              <PCard
                key={item.id}
                onClick={() => fileDetailDrawer.show(item)}
                itemStyle
                className="h-36 aspect-square"
              >
                <Flex vertical className="w-full h-full">
                  <Flex className="flex-grow rounded overflow-hidden">
                    <Image
                      src={FileUtil.getFileRealURL(item.path)}
                      className="h-full w-full"
                      width={300}
                      height={300}
                      alt="文件"
                    />
                  </Flex>
                  <Flex
                    align="center"
                    className="flex-shrink-0 h-8 px-4 text-xs"
                  >
                    <p className="text-center w-full line-clamp-1">
                      {item.filename}
                    </p>
                  </Flex>
                </Flex>
              </PCard>
            ))}
          </Flex>
        </Flex>
      </Flex>

      {/* 文件详情 */}
      <FileDetailDrawer {...fileDetailDrawer} />

      {/* 上传文件 */}
      <FileUploadModal {...fileUploader} />
    </>
  );
}
