export type PaginatedList<T> = {
  pageInfo: {
    hasNextPage: boolean;
    currentPage: number;
  };
} & T;
