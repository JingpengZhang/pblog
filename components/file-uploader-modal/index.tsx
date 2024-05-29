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
import { Folder } from "@/types/entity/folder";
import { useUploadFile } from "@/hooks/requests/file/use-upload-file";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import ToUploadFileItem, { MemoToUploadFileItem } from "./to-upload-file-item";

type Props = { folderId: Folder["id"]; onSuccess: () => void } & ReturnType<
  typeof useDisclosure
>;

type UploadFile = {
  id: string;
  file: File; // 文件
};

const FileUploadModal: React.FC<Props> = (props) => {
  // 已选文件列表
  const { list, push, getKey, remove, resetList, replace } =
    useDynamicList<UploadFile>([]);

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

            const id = nanoid(4);

            push({
              id,
              file,
            });
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
                  <MemoToUploadFileItem
                    {...item}
                    key={item.id}
                    onDelete={() => remove(index)}
                  />
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
