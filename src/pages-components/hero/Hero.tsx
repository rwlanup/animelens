import { FC } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchForm } from '../../components/search-form/SearchForm';

export const Hero: FC = () => {
  const router = useRouter();
  const onSubmit = (value: string): void => {
    router.push({
      query: { q: value },
      pathname: '/search',
    });
  };

  return (
    <Box sx={{ borderBottom: 4, pt: 5, borderColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          alignItems={{ md: 'flex-end' }}
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          <Grid
            item
            md={6}
          >
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Typography variant="h1">
                Search anime on <br />
                <Typography
                  color="primary.main"
                  variant="inherit"
                >
                  Animelens
                </Typography>
              </Typography>
            </Box>
            <SearchForm onSubmit={onSubmit} />
          </Grid>
          <Grid
            item
            md={6}
            alignSelf="center"
          >
            <Box>
              <Image
                src="/hero.png"
                priority
                height={480}
                width={624}
                objectFit="contain"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
