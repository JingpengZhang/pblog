import Flex from "@/components/Flex";
import Icon from "@/components/icon";
import FileUtil from "@/utils/file-util";
import { Spinner } from "@nextui-org/react";
import { useCreation, useMount, useUpdateEffect } from "ahooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  key?: string | number;
  id: string;
  file: File;
  onDelete: () => void;
};

const ToUploadFileItem: React.FC<Props> = (props) => {
  // 预览图
  const [preview, setPreview] = useState("");

  // 监听文件改变，生成预览图
  useMount(() => {
    if (props.file && FileUtil.isPicture(props.file)) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        setPreview(this.result as string);
      };
      fileReader.readAsDataURL(props.file);
    }
  });

  return (
    <>
      <Flex
        align="center"
        justify="center"
        vertical
        className="w-full  relative group overflow-hidden"
      >
        <Flex
          align="center"
          justify="center"
          className="w-full aspect-square rounded overflow-hidden bg-zinc-800 relative"
        >
          {FileUtil.isPicture(props.file) ? (
            <>
              {preview ? (
                <Image
                  src={preview}
                  alt="预览"
                  width={300}
                  height={300}
                  className="w-full h-fill object-cover"
                />
              ) : (
                <Flex>
                  <Spinner />
                </Flex>
              )}
            </>
          ) : (
            <>
              {["audio/mpeg"].indexOf(props.file.type) !== -1 && (
                <Icon
                  name="FileTypeMp3Outline"
                  viewSize={16}
                  size={36}
                  color="#8452ee"
                />
              )}

              {["video/mp4"].indexOf(props.file.type) !== -1 && (
                <Icon
                  name="FileTypeMp4Outline"
                  viewSize={16}
                  size={36}
                  color="#355dc8"
                />
              )}

              {["application/zip", "application/x-rar"].indexOf(
                props.file.type,
              ) !== -1 && (
                <Icon name="FolderZipSolid" size={44} color="#efa037" />
              )}

              {[
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ].indexOf(props.file.type) !== -1 && (
                <Icon
                  name="FileTypeDocSolid"
                  viewSize={16}
                  size={36}
                  color="#00539F"
                />
              )}

              {["application/pdf"].indexOf(props.file.type) !== -1 && (
                <Icon
                  name="FileTypePDFSolid"
                  viewSize={16}
                  size={36}
                  color="#FF131E"
                />
              )}

              {["text/plain"].indexOf(props.file.type) !== -1 && (
                <Icon
                  name="FileTypeTXTSolid"
                  viewSize={16}
                  size={36}
                  color="#A0B7B7"
                />
              )}

              {[
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ].indexOf(props.file.type) !== -1 && (
                <Icon
                  name="FileTypeXLSXSolid"
                  viewSize={16}
                  size={36}
                  color="#00BD50"
                />
              )}
            </>
          )}

          {/* 遮罩层 */}
          <Flex
            align="center"
            justify="center"
            className="w-full h-full absolute -top-full group-hover:top-0 left-0 bg-[rgba(0,0,0,0.6)]"
          >
            <Flex
              className="text-white hover:text-red-600 cursor-pointer"
              align="center"
              justify="center"
              onClick={props.onDelete}
            >
              <Icon name="XCircleOutline" size={20} />
            </Flex>
          </Flex>
        </Flex>

        <p className="text-center mt-2 px-1 text-xs text-ellipsis whitespace-nowrap overflow-hidden w-full">
          {props.file.name}
        </p>
      </Flex>
    </>
  );
};

export default ToUploadFileItem;

export const MemoToUploadFileItem = React.memo(ToUploadFileItem);
