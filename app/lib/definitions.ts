import { IconEntity } from "@/types/entity";

// 菜单项
export type MenuItem = {
  icon: Pick<IconEntity, "name">;
  name: string;
  path: string;
  children?: MenuItem[];
};
