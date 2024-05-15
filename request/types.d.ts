export interface PageParams {
  page_count?: number;
  page?: number;
}

type TResponseCode = 200 | 400 | 1001;

type TBaseResponse<T> = {
  code: TResponseCode;
  message: string;
  data: T;
};

export interface BaseResponseSimple extends BaseResponse<string> {}

export interface BaseListResponse<T>
  extends BaseResponse<{
    data: T[];
    current_page: number;
    last_page: number;
    per_page: string;
    total: number;
  }> {}
