import { useEffect, useState } from 'react';
import './App.css';
import CharacterList from './components/character-list';
import AppMenuBar from './components/app-menu-bar';
import { CharacterResults } from './models/character-results';
import { CharacterService } from './services/character-service';
import Pagination from '@material-ui/lab/Pagination';
import { Character } from './models/character';
import { Episode } from './models/episode';
import { RecommendationService } from './services/recommendation-service';

function App() {
  const [characterResults, setCharacterResults] = useState<CharacterResults>();
  const [recommendedEpisodes, setRecommendedEpisodes] = useState<
    Array<Episode>
  >();
  const [favoriteCharacters, setFavoriteCharacters] = useState<{
    [key: number]: Character;
  }>({});

  useEffect(() => {
    fetchCharacter();
  }, []);

  useEffect(() => {
    const recommendationService = RecommendationService.getInstance();
    const episodes = recommendationService.getRecommendedEpisodes(
      Object.values(favoriteCharacters)
    );

    setRecommendedEpisodes(episodes);
  }, [favoriteCharacters]);

  async function fetchCharacter(page: number = 1) {
    const characterService = CharacterService.getInstance();

    const charactersResponse = await characterService.getAllCharacters(page);

    setCharacterResults(charactersResponse);
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchCharacter(value);
  };

  const toggleFavorite = async (value: number, character: Character) => {
    if (favoriteCharacters[value]) {
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
      <AppMenuBar></AppMenuBar>
      <div>
        {recommendedEpisodes?.map((episode) => (
          <div>
            {episode.episode} - {episode.name}
          </div>
        ))}
      </div>
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
        />
      </div>
    </div>
  );
}

export default App;
