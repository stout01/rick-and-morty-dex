import TextField from '@material-ui/core/TextField';
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
    <div style={{ width: 300 }}>
      <TextField
        id="standard-basic"
        label="Standard"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
}
