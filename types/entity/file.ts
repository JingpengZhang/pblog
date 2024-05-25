export enum FileType {
  image = 1,
}

export type TFile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  path: string;
  filename: string;
  type: FileType.image;
  filesize: 12347;
  extension: string;
  extra: {
    width: 206;
    height: 105;
  };
  description: string;
  storagePath: string;
  uploader: {
    id: number;
    username: string;
  };
};
