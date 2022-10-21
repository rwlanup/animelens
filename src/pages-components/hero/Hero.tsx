import { FC, FormEvent, useState } from 'react';
import { Box, Container, TextField, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Hero: FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (searchText.trim().length > 0) {
      router.push({
        query: { q: searchText },
        pathname: '/search',
      });
    }
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
            <Box
              sx={{ display: 'flex', pb: 5 }}
              component="form"
              onSubmit={onSubmit}
            >
              <TextField
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search anime"
                InputProps={{
                  sx: {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    input: { py: 1.75, pl: 2.5 },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                type="submit"
              >
                Search
              </Button>
            </Box>
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
