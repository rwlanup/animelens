import { FC } from 'react';
import { AnimeListItem } from '../../types/anime';
import { Box, Typography, Chip, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface AnimeCardProps {
  anime: AnimeListItem;
}

export const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  const format = anime.format.replace('_', ' ').toLowerCase();

  return (
    <Link
      passHref
      href={`/anime/${anime.id}`}
    >
      <Button
        variant="text"
        component="a"
        sx={{
          bgcolor: 'primary.50',
          height: 1,
          p: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          border: 1,
          borderColor: 'primary.50',
          '&:hover,&:focus': {
            bgcolor: 'primary.100',
            borderColor: 'primary.100',
          },
        }}
      >
        <Box
          sx={{
            width: 1,
            aspectRatio: '2/3',
            maxHeight: 480,
            position: 'relative',
          }}
        >
          <Image
            layout="fill"
            priority
            objectFit="cover"
            src={anime.coverImage.large}
            alt={anime.title.userPreferred}
          />
        </Box>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Typography
            variant="subtitle"
            component="h3"
          >
            {anime.title.userPreferred}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              color: 'grey.600',
              mt: 1,
              alignItems: 'center',
            }}
          >
            <Typography sx={{ textTransform: 'capitalize' }}>{format}</Typography>
            {anime.seasonYear && (
              <>
                <Typography
                  variant="body"
                  component="span"
                >
                  |
                </Typography>
                <Typography
                  variant="body"
                  component="span"
                >
                  {anime.seasonYear}
                </Typography>
              </>
            )}
            {anime.averageScore && (
              <Chip
                color="secondary"
                label={anime.averageScore / 10}
                sx={{ ml: 'auto' }}
              />
            )}
          </Box>
        </Box>
      </Button>
    </Link>
  );
};
