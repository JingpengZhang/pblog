export enum FileType {
  image = 1, // 图片类
  video = 2, // 视频类
}

export type TFile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  path: string;
  filename: string;
  type: FileType;
  filesize: 12347;
  extension: string;
  extra: {
    width?: number;
    height?: number;
    thumb?: string;
  };
  description: string;
  storagePath: string;
  uploader: {
    id: number;
    username: string;
  };
};
