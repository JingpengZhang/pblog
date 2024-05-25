import { CloudUploadSolid } from "./src/cloud-upload-solid";
import { DockerSolid } from "./src/docker";
import { EyeSolid } from "./src/eye-solid";
import { FileTypeDocSolid } from "./src/file-type-doc-solid";
import { FileTypePDFSolid } from "./src/file-type-pdf-solid";
import { FileTypeTXTSolid } from "./src/file-type-txt-solid";
import { FileTypeXLSXSolid } from "./src/file-type-xlsx-solid";
import { FolderSolid } from "./src/folder-solid";
import { FolderZipSolid } from "./src/folder-zip-solid";
import { HeartSolid } from "./src/heart-solid";
import { JavaSolid } from "./src/java-solid";
import { LinkSolid } from "./src/link-solid";
import { MySQLSolid } from "./src/mysql-solid";
import { NestJsSolid } from "./src/nest-js-solid";
import { NginxSolid } from "./src/nginx-solid";
import { NodeJSSolid } from "./src/node-js-solid";
import { PlusSolid } from "./src/plus-solid";
import { ReactSolid } from "./src/react-solid";
import { VueSolid } from "./src/vue-solid";
import { WebpackSolid } from "./src/webpack-solid";

export const SolidIcons = {
  LinkSolid,
  HeartSolid,
  EyeSolid,
  VueSolid,
  ReactSolid,
  NestJsSolid,
  MySQLSolid,
  DockerSolid,
  NginxSolid,
  NodeJSSolid,
  WebpackSolid,
  JavaSolid,
  PlusSolid,
  FolderSolid,
  CloudUploadSolid,
  FolderZipSolid,
  FileTypeDocSolid,
  FileTypePDFSolid,
  FileTypeTXTSolid,
  FileTypeXLSXSolid,
};

export type SolidIconName = keyof typeof SolidIcons;
