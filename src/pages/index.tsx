import { Container } from '@mui/material';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { AnimeCardList } from '../components/anime-card-list/AnimeCardList';
import { SEARCH_ANIME } from '../gql/search-anime';
import { PaginatedAnimeList } from '../types/anime';
import { apolloClient } from '../util/apollo-client';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ popularAnimes, trendingAnimes }) => {
  return (
    <>
      <Head>
        <title>AnimeLens | A home for every anime information</title>
      </Head>
      <Container
        maxWidth={false}
        sx={{ py: 5 }}
      >
        <AnimeCardList
          animes={trendingAnimes}
          title="Trending Anime"
          url="/trending"
        />
        <AnimeCardList
          sx={{ mt: 10 }}
          animes={popularAnimes}
          title="Popular Anime"
          url="/popular"
        />
      </Container>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const currentYear = new Date().getFullYear();
  const { data: popularAnimeData } = await apolloClient.query<PaginatedAnimeList>({
    query: SEARCH_ANIME,
    variables: { perPage: 12, sort: 'POPULARITY', year: currentYear },
  });

  const { data: trendingAnimeData } = await apolloClient.query<PaginatedAnimeList>({
    query: SEARCH_ANIME,
    variables: { perPage: 12, sort: 'TRENDING', year: currentYear },
  });

  return {
    props: {
      popularAnimes: popularAnimeData.Page.media,
      trendingAnimes: trendingAnimeData.Page.media,
    },
  };
}
