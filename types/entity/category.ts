import { IconEntity } from "./icon";

// 文章分类
export type Category = {
  id: number;
  name: string;
  create_at: number;
  update_at: number;
  article_count: number;
  icon: IconEntity;
};
