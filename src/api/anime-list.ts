import { SEARCH_ANIME } from '../gql/search-anime';
import { AnimeListItem, PaginatedAnimeList } from '../types/anime';
import { apolloClient } from '../util/apollo-client';

export const getPopularTopAndTrendingAnimeOfYear = async (): Promise<{
  popularAnimes: AnimeListItem[];
  trendingAnimes: AnimeListItem[];
  topAnimes: AnimeListItem[];
}> => {
  const currentYear = new Date().getFullYear();
  const [{ data: popularAnimeData }, { data: trendingAnimeData }, { data: topAnimeData }] = await Promise.all([
    apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: { perPage: 12, sort: 'POPULARITY', year: currentYear },
    }),
    apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: { perPage: 12, sort: 'TRENDING', year: currentYear },
    }),
    apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: { perPage: 12, sort: 'SCORE_DESC', year: currentYear },
    }),
  ]);
  return {
    popularAnimes: popularAnimeData.Page.media,
    trendingAnimes: trendingAnimeData.Page.media,
    topAnimes: topAnimeData.Page.media,
  };
};
