import React, { ChangeEvent } from "react";

class FileUtil {
  static getFileRealURL(storagePath: string) {
    return "http://localhost:3000" + storagePath;
  }
  // 选择文件
  static selectLocalFiles(
    options: {
      accept: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      multiple?: boolean;
    } = {
      accept: ".jpg",
      onChange: () => {},
    },
  ) {
    const { accept, onChange } = options;

    const multiple = options.multiple || false;

    // 创建 input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.onchange = (e) => {
      onChange(e as any as React.ChangeEvent<HTMLInputElement>);
    };
    input.click();
  }
  // 判断文件是否为图片类型
  static isPicture(file: File) {
    return ["image/png", "image/jpeg", "image/gif"].indexOf(file.type) !== -1;
  }
}

export default FileUtil;
