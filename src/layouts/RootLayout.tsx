import type { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { Header } from './components/header/Header';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        id="main"
      >
        {children}
      </Box>
    </>
  );
};
