declare namespace RequestModule {
  type Response<T> = {
    code: 200;
    message: string;
    data: T;
  };

  type DeleteData = {
    code: 200;
    message: string;
    data: {
      count: 1;
    };
  };

  type SimpleResponse = {
    code: 200;
    message: string;
  };

  type ListResponse<T> = Response<{
    list: T[];
    currentPage: number;
    pageSize: number;
    total: number;
  }>;

  type PageParams = {
    page?: number;
    pageSize?: number;
  };
}
