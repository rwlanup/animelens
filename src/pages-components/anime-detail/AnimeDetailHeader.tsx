import type { FC } from 'react';
import { AnimeDetail } from '../../types/anime';
import { Typography, Container, Box, Chip, Grid } from '@mui/material';

export const AnimeDetailHeader: FC<{ anime: AnimeDetail }> = ({ anime }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h1"
        sx={{ mb: 2 }}
      >
        {anime.title.userPreferred}
      </Typography>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={1}
        alignItems="center"
      >
        <Grid item>
          <Typography
            fontWeight="Bold"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            {anime.format.toLowerCase()}
            {anime.seasonYear && <> | {anime.seasonYear}</>}
          </Typography>
        </Grid>
        <Grid item>
          <Chip
            color="warning"
            label={anime.status.toLowerCase()}
            sx={{ textTransform: 'capitalize' }}
          />
        </Grid>
        {anime.averageScore && (
          <Grid item>
            <Chip
              color="secondary"
              label={`Score: ${anime.averageScore / 10} of 10`}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
