import { NextPage } from 'next';
import { Box, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { SearchForm } from '../components/search-form/SearchForm';
import { AnimeCardList } from '../components/anime-card-list/AnimeCardList';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ALLOWED_SORT, SEARCH_ANIME } from '../gql/search-anime';
import { PaginatedAnimeList, SearchAnimeVariables } from '../types/anime';
import Link from 'next/link';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import Head from 'next/head';
import { useQuery } from '@apollo/client';

const SearchPage: NextPage = () => {
  const { query, push } = useRouter();
  const { sort, q, page } = query;

  const getQueryVariables = () => {
    const queryVariables: SearchAnimeVariables = {
      perPage: 12,
      page: typeof page === 'string' && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1,
    };
    if (typeof sort === 'string' && ALLOWED_SORT.includes(sort)) queryVariables.sort = sort;
    if (typeof q === 'string') queryVariables.search = q;
    return queryVariables;
  };

  const { data, loading, error } = useQuery<PaginatedAnimeList>(SEARCH_ANIME, {
    variables: getQueryVariables(),
  });

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

  const onSearchSubmit = (value: string): void => {
    push({
      query: {
        ...query,
        q: value,
      },
    });
  };

  return (
    <>
      <Head>
        <title>
          {typeof query.q === 'string'
            ? `Find all ${query.q} animes | Animelens`
            : `Search ${currentAnimeType} anime | Animelens`}
        </title>
        <meta
          name="description"
          content={`Search ${currentAnimeType} animes and get up-to date information about trending and popular animes right now`}
        />
      </Head>
      <Box sx={{ borderBottom: 4, borderColor: 'primary.main', py: 5 }}>
        {error ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}>
            <Typography
              variant="h4"
              color="error"
            >
              {error.message}
            </Typography>
          </Box>
        ) : loading || !data ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}>
            <CircularProgress size="5rem" />
          </Box>
        ) : (
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
        )}
      </Box>
    </>
  );
};

export default SearchPage;
