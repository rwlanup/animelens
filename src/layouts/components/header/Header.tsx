import type { FC } from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderSearchForm } from './HeaderSearchForm';

export const Header: FC = () => {
  return (
    <AppBar
      color="transparent"
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Link
          passHref
          href="/"
        >
          <Box component="a">
            <Image
              height={56}
              width={56}
              src="/logo.svg"
            />
          </Box>
        </Link>
        <Box sx={{ ml: 'auto' }}>
          <HeaderSearchForm />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
