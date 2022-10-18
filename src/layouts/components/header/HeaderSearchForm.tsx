import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

export const HeaderSearchForm: FC = () => {
  const { query } = useRouter();
  const [searchText, setSearchText] = useState(typeof query.search === 'string' ? query.search : '');

  return (
    <Box>
      <Button>Search</Button>
    </Box>
  );
};
