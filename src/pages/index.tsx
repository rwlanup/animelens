import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { getPopularTopAndTrendingAnimeOfYear } from '../api/anime-list';
import { AnimeCardList } from '../components/anime-card-list/AnimeCardList';
import { Hero } from '../pages-components/hero/Hero';
import { AnimeListItem } from '../types/anime';

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
  const animeData = await getPopularTopAndTrendingAnimeOfYear();

  return {
    props: animeData,
    revalidate: 86400, // 86400 = 24*60*60 seconds = 1day
  };
};
