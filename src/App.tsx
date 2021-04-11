import { useEffect, useState } from 'react';
import './App.css';
import CharacterList from './components/character-list';
import AppMenuBar from './components/app-menu-bar';
import { CharacterResults } from './models/character-results';
import { CharacterService } from './services/character-service';

function App() {
  const [characterResults, setCharacterResults] = useState<CharacterResults>();

  useEffect(() => {
    async function fetchCharacter() {
      const characterService = CharacterService.getInstance();

      const charactersResponse = await characterService.getAllCharacters(1);

      setCharacterResults(charactersResponse);
    }

    fetchCharacter();
  }, []);

  return (
    <div>
      <AppMenuBar></AppMenuBar>
      <div className="App">
        <CharacterList characterResults={characterResults}></CharacterList>
      </div>
    </div>
  );
}

export default App;
