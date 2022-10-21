import { InferGetServerSidePropsType, NextPage, GetServerSideProps } from 'next';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { SearchForm } from '../components/search-form/SearchForm';
import { AnimeCardList } from '../components/anime-card-list/AnimeCardList';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { apolloClient } from '../util/apollo-client';
import { SEARCH_ANIME } from '../gql/search-anime';
import { PaginatedAnimeList, SearchAnimeVariables } from '../types/anime';
import Link from 'next/link';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ isError, data }) => {
  const { query, push } = useRouter();
  const currentAnimeType = useMemo((): string => {
    switch (query.sort) {
      case 'POPULARITY':
        return 'popular';
      case 'SCORE_DESC':
        return 'top';
      case 'TRENDING':
        return 'trending';
      default:
        return 'your favourite';
    }
  }, [query.sort]);

  if (!data || isError) return <div>Error</div>;

  const onSearchSubmit = (value: string): void => {
    push({
      query: {
        ...query,
        q: value,
      },
    });
  };

  return (
    <Box sx={{ borderBottom: 4, borderColor: 'primary.main', py: 5, bgcolor: 'primary.50' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h1"
          sx={{ mb: 2 }}
        >
          Search {currentAnimeType} anime
        </Typography>
        <SearchForm
          sx={{ pb: 0 }}
          onSubmit={onSearchSubmit}
        />
        <AnimeCardList
          sx={{ mb: 5 }}
          animes={data.Page.media}
        />
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
        >
          {data.Page.pageInfo.currentPage > 1 && (
            <Grid item>
              <Link
                passHref
                href={{ query: { ...query, page: data.Page.pageInfo.currentPage - 1 } }}
              >
                <Button startIcon={<ChevronLeftOutlined />}>Prev</Button>
              </Link>
            </Grid>
          )}
          {data.Page.pageInfo.hasNextPage && (
            <Grid item>
              <Link
                passHref
                href={{ query: { ...query, page: data.Page.pageInfo.currentPage + 1 } }}
              >
                <Button endIcon={<ChevronRightOutlined />}>Next</Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;

type GetServerSideReturn =
  | {
      isError: false;
      data: PaginatedAnimeList;
    }
  | { isError: true; data: null };
export const getServerSideProps: GetServerSideProps<GetServerSideReturn> = async ({ query }) => {
  try {
    const { sort, q, page } = query;

    const queryVariables: SearchAnimeVariables = {
      perPage: 24,
      page: typeof page === 'string' && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1,
    };
    if (typeof sort === 'string') queryVariables.sort = sort;
    if (typeof q === 'string') queryVariables.search = q;

    const { data } = await apolloClient.query<PaginatedAnimeList>({
      query: SEARCH_ANIME,
      variables: queryVariables,
    });

    return {
      props: {
        isError: false,
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        isError: true,
        data: null,
      },
    };
  }
};
