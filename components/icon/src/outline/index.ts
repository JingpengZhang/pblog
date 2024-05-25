import { ChevronLeftOutline } from "./src/chevron-left-outline";
import { EllipsisVerticalOutline } from "./src/ellipsis-vertical-outline";
import { EyeOutline } from "./src/eye-outline";
import { FolderOutline } from "./src/folde-outline";
import { FolderMinusOutline } from "./src/folder-minus-outline";
import { FolderOpenOutline } from "./src/folder-open-outline";
import { FolderPlusOutline } from "./src/folder-plus-outline";
import { FoldersLibraryOutline } from "./src/folders-library-outline";
import { HeartOutline } from "./src/heart-outline";
import { ListBulletOutline } from "./src/list-bullet-outline";
import { MinusOutline } from "./src/minus-outline";
import { NewsPaperOutline } from "./src/newspaper-outline";
import { PencilOutline } from "./src/pencil-outline";
import { ShareOutline } from "./src/share-outline";
import { TagOutline } from "./src/tag-outline";

export const OutlineIcons = {
  HeartOutline,
  EyeOutline,
  ShareOutline,
  TagOutline,
  NewsPaperOutline,
  PencilOutline,
  ListBulletOutline,
  MinusOutline,
  FoldersLibraryOutline,
  FolderOutline,
  FolderOpenOutline,
  FolderPlusOutline,
  FolderMinusOutline,
  ChevronLeftOutline,
  EllipsisVerticalOutline,
};

export type OutlineIconName = keyof typeof OutlineIcons;
