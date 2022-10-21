import { Typography, Container, Grid, Button, Box } from '@mui/material';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { AnimeCard } from '../components/anime-card/AnimeCard';
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
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="Bold"
            >
              Trending Anime
            </Typography>
          </Grid>
          <Grid item>
            <Link
              passHref
              href="/trending"
            >
              <Button variant="outlined">View more</Button>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Grid
            container
            spacing={3}
          >
            {trendingAnimes.map((anime) => (
              <Grid
                key={anime.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <AnimeCard anime={anime} />
              </Grid>
            ))}
          </Grid>
        </Box>
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
