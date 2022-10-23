import type { FC } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { AnimeDetail } from '../../types/anime';
import Image from 'next/image';

const AnimeOtherDetail: FC<{ label: string; content: string }> = ({ label, content }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs
          sx={{ maxWidth: '120px !important' }}
        >
          <Typography
            fontWeight="Bold"
            color="text.secondary"
          >
            {label}:
          </Typography>
        </Grid>
        <Grid
          item
          xs
        >
          <Typography>{content}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const AnimeDetailDescription: FC<{ anime: AnimeDetail }> = ({ anime }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Grid
        container
        alignItems="flex-start"
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md
          sx={{ maxWidth: { md: '360px!important' } }}
        >
          <Box
            sx={{
              aspectRatio: '2/3',
              position: 'relative',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <Image
              layout="fill"
              priority
              objectFit="cover"
              alt={anime.title.userPreferred}
              src={anime.coverImage.extraLarge}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs
        >
          <Typography
            component="h2"
            variant="h3"
            sx={{ mb: 1 }}
          >
            Description
          </Typography>
          <Typography
            paragraph
            dangerouslySetInnerHTML={{ __html: anime.description }}
            sx={{ 'ol,ul': { listStylePosition: 'inside' } }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          component="h3"
          sx={{ mb: 2 }}
        >
          Other details
        </Typography>
        {anime.genres.length > 0 && (
          <AnimeOtherDetail
            label="Genres"
            content={anime.genres.join(', ')}
          />
        )}
        {anime.duration && (
          <AnimeOtherDetail
            label="Duration"
            content={`${anime.duration} minutes`}
          />
        )}
        {anime.synonyms && (
          <AnimeOtherDetail
            label="Other names"
            content={anime.synonyms.join(', ')}
          />
        )}
      </Box>
    </Container>
  );
};
