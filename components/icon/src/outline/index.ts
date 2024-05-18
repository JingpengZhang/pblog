import { EyeOutline } from "./src/eye-outline";
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
};

export type OutlineIconName = keyof typeof OutlineIcons;
