import { PaginatedList } from './util';

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

type AnimeList = {
  Page: { media: AnimeListItem[] };
};

export type PaginatedAnimeList = PaginatedList<AnimeList>;
