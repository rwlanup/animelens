import type { FC } from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';

const NAV_ITEMS: { label: string; link: LinkProps['href'] }[] = [
  {
    label: 'Top',
    link: { pathname: '/search', query: { sort: 'SCORE_DESC' } },
  },
  {
    label: 'Trending',
    link: { pathname: '/search', query: { sort: 'TRENDING' } },
  },
  {
    label: 'Popular',
    link: { pathname: '/search', query: { sort: 'POPULARITY' } },
  },
];

export const Header: FC = () => {
  return (
    <AppBar
      color="default"
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
          <Box
            sx={{ display: 'flex', flexShrink: 0 }}
            component="a"
          >
            <Image
              height={48}
              width={48}
              src="/logo.svg"
            />
          </Box>
        </Link>
        <Box sx={{ ml: 'auto' }}>
          {NAV_ITEMS.map((navItem) => (
            <Link
              key={navItem.label}
              passHref
              href={navItem.link}
            >
              <Button
                variant="text"
                sx={{ ml: 1, px: { xs: 1, sm: 2.5 }, py: { xs: 0.5, sm: 1 } }}
              >
                {navItem.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
