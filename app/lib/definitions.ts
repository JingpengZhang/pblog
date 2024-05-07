import { IconProps } from "../ui/common/icon";

// 菜单项
export type MenuItem = {
  icon: IconProps;
  name: string;
  path: string;
  children?: MenuItem[];
};

// 文章分类
export type Category = {
  id: string;
  name: string;
  create_at: number;
  update_at: number;
  article_count: number;
  icon: IconProps;
};
