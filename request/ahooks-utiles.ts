import { BaseListResponse, BaseResponse, PageParams } from "./types";

export interface UsePaginationPageParams {
  current: number;
  pageSize: number;
}

export const ahookRequest = <T, R>(
  request: (args: T) => Promise<BaseResponse<R>>,
  params: T,
): Promise<R> => {
  return new Promise((resolve, reject) => {
    request(params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const ahookPaginationRequest = <T, R>(
  request: (args: PageParams & T) => Promise<BaseListResponse<R>>,
  page: UsePaginationPageParams,
  params: T,
): Promise<{
  total: number;
  list: R[];
}> => {
  return new Promise((resolve, reject) => {
    request({
      page: page.current,
      page_count: page.pageSize,
      ...params,
    })
      .then((res) => {
        resolve({
          total: res.data.total,
          list: res.data.data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
