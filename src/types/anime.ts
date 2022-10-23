export interface AnimeListItem {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    large: string;
  };
  format: string;
  seasonYear: number | null;
  averageScore: number | null;
}

export type PaginatedAnimeList = {
  Page: {
    media: AnimeListItem[];
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
    };
  };
};

export interface SearchAnimeVariables {
  search?: string;
  sort?: string;
  perPage: number;
  page: number;
}
