import { useEffect, useState } from 'react';
import './App.css';
import CharacterList from './components/character-list';
import AppMenuBar from './components/app-menu-bar';
import { CharacterResults } from './models/character-results';
import { CharacterService } from './services/character-service';
import Pagination from '@material-ui/lab/Pagination';

function App() {
  const [characterResults, setCharacterResults] = useState<CharacterResults>();

  useEffect(() => {
    fetchCharacter();
  }, []);

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

  return (
    <div>
      <AppMenuBar></AppMenuBar>
      <div className="App">
        <CharacterList characterResults={characterResults}></CharacterList>
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
