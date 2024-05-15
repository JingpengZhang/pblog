import { IconEntity } from "@/types/entity";

// 菜单项
export type MenuItem = {
  icon: IconEntity;
  name: string;
  path: string;
  children?: MenuItem[];
};
