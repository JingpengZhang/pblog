import { Category } from "../../definitions";
import API_URLS from "../api-urls";
import { requestManager } from "../axios-instance";

// 添加分类
export interface AddCategoryParams {
  name: Category["name"];
  icon: Category["icon"];
}
export const addCategoryRequest = (params: AddCategoryParams) => {
  return requestManager.post(API_URLS.category.create, params);
};
