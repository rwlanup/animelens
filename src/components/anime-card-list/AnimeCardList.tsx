import type { FC } from 'react';
import { AnimeListItem } from '../../types/anime';
import { Typography, Grid, Button, Box, BoxProps, TypographyProps } from '@mui/material';
import Link from 'next/link';
import { AnimeCard } from '../anime-card/AnimeCard';

interface AnimeCardListProps extends BoxProps {
  animes: AnimeListItem[];
  title?: string;
  url?: string;
  TitleProps?: TypographyProps;
}

export const AnimeCardList: FC<AnimeCardListProps> = ({ animes, title, url, TitleProps, ...otherProps }) => {
  if (animes.length === 0) return null;

  return (
    <Box {...otherProps}>
      {title && (
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h2"
              fontWeight="Bold"
              {...TitleProps}
            >
              {title}
            </Typography>
          </Grid>
          {url && (
            <Grid item>
              <Link
                passHref
                href={url}
              >
                <Button variant="outlined">View more</Button>
              </Link>
            </Grid>
          )}
        </Grid>
      )}
      <Box sx={{ mt: 4 }}>
        <Grid
          container
          spacing={3}
        >
          {animes.map((anime) => (
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
    </Box>
  );
};
