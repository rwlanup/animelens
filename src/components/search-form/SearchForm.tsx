import { FC, useState, FormEvent, useEffect } from 'react';
import { BoxProps, Box, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface SearchFormProps extends Omit<BoxProps, 'onSubmit'> {
  onSubmit?: (value: string) => void;
}
export const SearchForm: FC<SearchFormProps> = ({ onSubmit, ...otherProps }) => {
  const { query } = useRouter();
  const q = query.q;
  const [searchText, setSearchText] = useState(typeof q === 'string' ? q : '');

  useEffect(() => {
    setSearchText(typeof q === 'string' ? q : '');
  }, [q]);

  const _onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (searchText.trim().length > 0 && onSubmit) {
      onSubmit(searchText.trim());
    }
  };

  return (
    <Box
      {...otherProps}
      sx={{ display: 'flex', pb: 5, ...otherProps.sx }}
      component="form"
      onSubmit={_onSubmit}
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
              borderWidth: '1px!important',
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
  );
};
