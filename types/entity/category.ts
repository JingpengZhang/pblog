import { IconEntity } from "./icon";

// 文章分类
export type Category = {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  article_count: number;
  icon: IconEntity;
};
