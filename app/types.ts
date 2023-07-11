export type RawgListResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type NavigationLocationState = {
  page?: string;
  meta?: {
    [k: string]: string;
  }[];
};
