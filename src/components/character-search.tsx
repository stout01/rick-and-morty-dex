import { InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/use-debounce';

type CharacterSearchProps = {
  onChange: (text: string) => void;
};

export default function CharacterSearch({ onChange }: CharacterSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  return (
    <TextField
      label="Search"
      onChange={(event) => setSearchTerm(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}
