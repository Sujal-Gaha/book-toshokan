export type TApiResponse<T> = {
  status: number;
  body: {
    data: T;
    message: string;
  };
};

export type TApiError = {
  status: number;
  body: {
    data: null;
    message: string;
  };
};
