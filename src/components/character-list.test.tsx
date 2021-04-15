import { Favorite } from '@material-ui/icons';
import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Character } from '../models/character';
import { CharacterResults } from '../models/character-results';
import CharacterList from './character-list';

describe('CharacterList', () => {
  const character: Character = {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      id: 1,
      name: 'Earth (C-137)',
    },
    episode: [
      {
        id: 1,
        name: 'Pilot',
        episode: 'S01E01',
      },
    ],
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  };

  it('should render character list', () => {
    const characterResults = { results: [character] };
    const favoriteCharacters = {};
    const setFavorite = () => {};
    render(
      <CharacterList
        characterResults={characterResults as CharacterResults}
        favoriteCharacters={favoriteCharacters}
        setFavorite={setFavorite}
      ></CharacterList>
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  it('should set favorite character', () => {
    const characterResults = { results: [character] };
    const favoriteCharacters = {};
    const setFavorite = jest.fn();
    render(
      <CharacterList
        characterResults={characterResults as CharacterResults}
        favoriteCharacters={favoriteCharacters}
        setFavorite={setFavorite}
      ></CharacterList>
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(`info about ${character.name}`));
    expect(setFavorite).toHaveBeenCalledWith(character.id, character);
  });

  it('should set favorite icon', () => {
    const characterResults = { results: [character] };
    const favoriteCharacters = { [character.id]: character };
    const setFavorite = jest.fn();
    render(
      <CharacterList
        characterResults={characterResults as CharacterResults}
        favoriteCharacters={favoriteCharacters}
        setFavorite={setFavorite}
      ></CharacterList>
    );

    const characterImage = screen.getByAltText(character.name);
    expect(characterImage).toBeInTheDocument();

    expect(characterImage.parentElement).not.toBeNull();
    const characterTile = characterImage.parentElement!;

    expect(getByTestId(characterTile, 'FavoriteIcon')).toBeInTheDocument();
  });

  it('should set favorite border icon', () => {
    const characterResults = { results: [character] };
    const favoriteCharacters = {};
    const setFavorite = jest.fn();
    render(
      <CharacterList
        characterResults={characterResults as CharacterResults}
        favoriteCharacters={favoriteCharacters}
        setFavorite={setFavorite}
      ></CharacterList>
    );

    const characterImage = screen.getByAltText(character.name);
    expect(characterImage).toBeInTheDocument();

    expect(characterImage.parentElement).not.toBeNull();
    const characterTile = characterImage.parentElement!;

    expect(
      getByTestId(characterTile, 'FavoriteBorderIcon')
    ).toBeInTheDocument();
  });
});
