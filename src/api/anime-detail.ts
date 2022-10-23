import { GET_ANIME_DETAIL } from '../gql/anime-detail';
import { AnimeDetail } from '../types/anime';
import { apolloClient } from '../util/apollo-client';

export const getAnimeDetail = async (id: number): Promise<AnimeDetail> => {
  const { data } = await apolloClient.query<{ Media: AnimeDetail }>({
    query: GET_ANIME_DETAIL,
    variables: { id },
  });
  return data.Media;
};
