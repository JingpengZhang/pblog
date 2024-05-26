import FileUtil from "@/utils/file-util";
import {
  Button,
  Listbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useDynamicList, useMemoizedFn } from "ahooks";
import React from "react";
import List from "../list";
import Flex from "../Flex";
import Icon from "../icon";
import Image from "next/image";
import { Folder } from "@/types/entity/folder";
import { useUploadFile } from "@/hooks/requests/file/use-upload-file";
import { toast } from "react-toastify";

type Props = { folderId: Folder["id"]; onSuccess: () => void } & ReturnType<
  typeof useDisclosure
>;

type UploadFile = {
  preview: string; // 预览
  file: File; // 文件
};

const FileUploadModal: React.FC<Props> = (props) => {
  // 已选文件列表
  const { list, push, getKey, remove, resetList } = useDynamicList<UploadFile>(
    [],
  );

  // 选择文件
  const selectFiles = useMemoizedFn(() => {
    FileUtil.selectLocalFiles({
      accept:
        ".jpg,.png,.mp4,.mp3,.zip,.rar,.txt,.pdf,.docx,.doc,.xls,.xlsx,.ppt,.pptx,.gif",
      multiple: true,
      onChange: (e) => {
        const files = e.target.files;
        if (files) {
          console.log(files);

          for (let i = 0; i < files.length; i++) {
            const file = files[i];

            console.log(file.type);

            let preview = "";

            // 如果是图片，设置预览图
            if (
              ["image/png", "image/jpeg", "image/gif"].indexOf(file.type) !== -1
            ) {
              const fileReader = new FileReader();
              fileReader.onload = function () {
                preview = this.result as string;
                push({
                  file,
                  preview,
                });
              };
              fileReader.readAsDataURL(file);
            } else {
              push({
                file,
                preview,
              });
            }
          }
        }
      },
    });
  });

  // 文件上传 hook
  const { request: uploadRequest } = useUploadFile({
    onSuccess: () => {
      toast.success("文件上传成功");

      // 重新请求文件列表,并关闭弹窗
      props.onSuccess();
    },
  });

  // 提交
  const submit = useMemoizedFn(() => {
    console.log(list, props.folderId);
    // 构造 FormData
    const formData = new FormData();

    // 文件夹 id
    formData.append("folder_id", props.folderId.toString());

    // 加入文件
    list.forEach((v, i) => {
      formData.append(`files[${i}]`, v.file);
    });

    // 发起请求
    uploadRequest.run(formData);
  });

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      size="2xl"
      radius="sm"
      className=""
    >
      <ModalContent className="">
        {(onClose) => (
          <>
            <ModalHeader>
              <span className="text-sm">上传文件</span>
            </ModalHeader>
            <ModalBody className="">
              <List
                className="grid grid-cols-6 gap-x-4 gap-y-4"
                data={list}
                itemRender={(item, index) => (
                  <Flex
                    align="center"
                    justify="center"
                    vertical
                    key={getKey(index)}
                    className="w-full  relative group overflow-hidden"
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className="w-full aspect-square rounded overflow-hidden bg-zinc-800 relative"
                    >
                      {item.preview ? (
                        <Image
                          src={item.preview}
                          alt="预览"
                          width={300}
                          height={300}
                          className="w-full h-fill object-cover"
                        />
                      ) : (
                        <>
                          {["audio/mpeg"].indexOf(item.file.type) !== -1 && (
                            <Icon
                              name="FileTypeMp3Outline"
                              viewSize={16}
                              size={36}
                              color="#8452ee"
                            />
                          )}

                          {["video/mp4"].indexOf(item.file.type) !== -1 && (
                            <Icon
                              name="FileTypeMp4Outline"
                              viewSize={16}
                              size={36}
                              color="#355dc8"
                            />
                          )}

                          {["application/zip", "application/x-rar"].indexOf(
                            item.file.type,
                          ) !== -1 && (
                            <Icon
                              name="FolderZipSolid"
                              size={44}
                              color="#efa037"
                            />
                          )}

                          {[
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          ].indexOf(item.file.type) !== -1 && (
                            <Icon
                              name="FileTypeDocSolid"
                              viewSize={16}
                              size={36}
                              color="#00539F"
                            />
                          )}

                          {["application/pdf"].indexOf(item.file.type) !==
                            -1 && (
                            <Icon
                              name="FileTypePDFSolid"
                              viewSize={16}
                              size={36}
                              color="#FF131E"
                            />
                          )}

                          {["text/plain"].indexOf(item.file.type) !== -1 && (
                            <Icon
                              name="FileTypeTXTSolid"
                              viewSize={16}
                              size={36}
                              color="#A0B7B7"
                            />
                          )}

                          {[
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                          ].indexOf(item.file.type) !== -1 && (
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
                          onClick={() => remove(index)}
                        >
                          <Icon name="XCircleOutline" size={20} />
                        </Flex>
                      </Flex>
                    </Flex>

                    <p className="text-center mt-2 px-1 text-xs text-ellipsis whitespace-nowrap overflow-hidden w-full">
                      {item.file.name}
                    </p>
                  </Flex>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Flex justify="space-between" align="center" className="w-full">
                <Flex gap={10}>
                  <Button
                    isDisabled={list.length === 0}
                    onClick={() => resetList([])}
                    radius="sm"
                    size="sm"
                    variant="flat"
                    color="primary"
                  >
                    清空列表
                  </Button>
                  <Button
                    radius="sm"
                    size="sm"
                    variant="flat"
                    color="primary"
                    onClick={selectFiles}
                  >
                    选择文件
                  </Button>
                </Flex>
                <Flex>
                  <Button
                    isDisabled={list.length === 0}
                    radius="sm"
                    size="sm"
                    variant="solid"
                    color="primary"
                    onClick={submit}
                    isLoading={uploadRequest.loading}
                  >
                    开始上传
                  </Button>
                </Flex>
              </Flex>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;

export const useFileUploader = (
  folderId: Folder["id"],
  onSuccess: () => void,
): Props => {
  const disclosure = useDisclosure();

  return {
    onSuccess,
    folderId,
    ...disclosure,
  };
};
