import { PaginatedList } from './util';

export interface AnimeListItem {
  id: number;
  title: {
    userPreffered: string;
  };
  coverImage: {
    medium: string;
  };
  format: string;
  seasonYear: string | null;
  averageScore: number | null;
}

type AnimeList = {
  Page: { media: AnimeListItem[] };
};

export type PaginatedAnimeList = PaginatedList<AnimeList>;
