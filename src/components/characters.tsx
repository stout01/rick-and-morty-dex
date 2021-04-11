import { PaginationItem } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Character } from '../models/character';
import { CharacterResults } from '../models/character-results';
import { CharacterService } from '../services/character-service';
import CharacterList from './character-list';

type CharactersProps = {
  favoriteCharacters?: { [key: number]: Character };
  setFavoriteCharacters: (characters: { [key: number]: Character }) => void;
};

export default function Characters({
  favoriteCharacters,
  setFavoriteCharacters,
}: CharactersProps) {
  const [characterResults, setCharacterResults] = useState<CharacterResults>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    const page = query.get('page') || '';
    const parsedPageNumber = Number.parseInt(page);
    if (parsedPageNumber) {
      fetchCharacter(parsedPageNumber);
    } else {
      fetchCharacter();
    }
  }, []);

  if (!favoriteCharacters) {
    return null;
  }

  async function fetchCharacter(page: number = 1) {
    const characterService = CharacterService.getInstance();

    const charactersResponse = await characterService.getAllCharacters(page);

    setCharacterResults(charactersResponse);
    setPageNumber(page);
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchCharacter(value);
  };

  const toggleFavorite = async (value: number, character: Character) => {
    if (favoriteCharacters && favoriteCharacters[value]) {
      const updatedCharacters = { ...favoriteCharacters };
      delete updatedCharacters[value];
      setFavoriteCharacters(updatedCharacters);
    } else {
      setFavoriteCharacters({
        ...favoriteCharacters,
        [value]: character,
      });
    }
  };

  return (
    <div>
      <div className="App">
        <CharacterList
          characterResults={characterResults}
          favoriteCharacters={favoriteCharacters}
          setFavorite={(value: number, character: Character) =>
            toggleFavorite(value, character)
          }
        ></CharacterList>
        <Pagination
          color="primary"
          variant="outlined"
          count={characterResults?.info.pages}
          onChange={handlePageChange}
          page={pageNumber}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/characters${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}
