import { createStyles, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Character } from '../models/character';
import { CharacterResults } from '../models/character-results';
import { CharacterService } from '../services/character-service';
import CharacterList from './character-list';
import PageControls from './page-controls';

type CharactersProps = {
  favoriteCharacters?: { [key: number]: Character };
  setFavoriteCharacters: (characters: { [key: number]: Character }) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    pagination: {
      alignSelf: 'center',
    },
  })
);

export default function CharactersPage({
  favoriteCharacters,
  setFavoriteCharacters,
}: CharactersProps) {
  const classes = useStyles();

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

  const handlePageChange = (value: number) => {
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
    <div className={classes.root}>
      <CharacterList
        characterResults={characterResults}
        favoriteCharacters={favoriteCharacters}
        setFavorite={(value: number, character: Character) =>
          toggleFavorite(value, character)
        }
      ></CharacterList>
      <PageControls
        className={classes.pagination}
        onChange={handlePageChange}
        pageCount={characterResults?.info.pages}
        currentPage={pageNumber}
      ></PageControls>
    </div>
  );
}
