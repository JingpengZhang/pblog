import { IconEntity } from "@/types/entity";

// 菜单项
export type MenuItem = {
  icon: IconEntity;
  name: string;
  path: string;
  children?: MenuItem[];
};

// 文章分类
export type Category = {
  id: number;
  name: string;
  create_at: number;
  update_at: number;
  article_count: number;
  icon: IconEntity;
};
