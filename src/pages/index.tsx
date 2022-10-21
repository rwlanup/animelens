import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { AnimeCardList } from '../components/anime-card-list/AnimeCardList';
import { SEARCH_ANIME } from '../gql/search-anime';
import { Hero } from '../pages-components/hero/Hero';
import { AnimeListItem, PaginatedAnimeList } from '../types/anime';
import { apolloClient } from '../util/apollo-client';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  popularAnimes,
  trendingAnimes,
  topAnimes,
}) => {
  return (
    <>
      <Head>
        <title>AnimeLens | Find information about your favourite anime</title>
        <meta
          name="description"
          content="Find information about every anime and get up-to date information about trending and popular animes right now"
        />
      </Head>
      <Hero />
      <Container
        maxWidth="xl"
        sx={{ py: 5 }}
      >
        <AnimeCardList
          animes={topAnimes}
          title="Top Anime"
          url={{ pathname: '/search?sort=SCORE_DESC' }}
        />
        <AnimeCardList
          sx={{ mt: 10 }}
          animes={trendingAnimes}
          title="Trending Anime"
          url={{ pathname: '/search?sort=TRENDING' }}
        />
        <AnimeCardList
          sx={{ mt: 10 }}
          animes={popularAnimes}
          title="Popular Anime"
          url={{ pathname: '/search?sort=POPULARITY' }}
        />
      </Container>
    </>
  );
};

export default Home;

interface StaticPropsReturns {
  popularAnimes: AnimeListItem[];
  topAnimes: AnimeListItem[];
  trendingAnimes: AnimeListItem[];
}

export const getStaticProps: GetStaticProps<StaticPropsReturns> = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const { data: popularAnimeData } = await apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: { perPage: 12, sort: 'POPULARITY', year: currentYear },
    });

    const { data: trendingAnimeData } = await apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: { perPage: 12, sort: 'TRENDING', year: currentYear },
    });

    const { data: topAnimeData } = await apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: { perPage: 12, sort: 'SCORE_DESC', year: currentYear },
    });

    return {
      props: {
        popularAnimes: popularAnimeData.Page.media,
        trendingAnimes: trendingAnimeData.Page.media,
        topAnimes: topAnimeData.Page.media,
      },
    };
  } catch (error) {
    return {
      props: {
        popularAnimes: [] as AnimeListItem[],
        trendingAnimes: [] as AnimeListItem[],
        topAnimes: [] as AnimeListItem[],
      },
    };
  }
};
