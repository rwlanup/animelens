import type { FC } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
interface ErrorScreenProps {
  status: 404 | 500;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({ status }) => {
  return (
    <Container
      sx={{ py: 5 }}
      maxWidth="lg"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 3,
          minHeight: '60vh',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ mb: 2 }}
          variant="h1"
          color="error"
        >
          {status === 404 ? '404 Page not found' : 'Oops, something went wrong'}
        </Typography>
        <Link
          passHref
          href="/"
        >
          <Button>Go to home</Button>
        </Link>
      </Box>
    </Container>
  );
};
