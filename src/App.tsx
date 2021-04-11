import { useEffect, useState } from 'react';
import './App.css';
import { CharacterItemComponent } from './components/character-item';
import { Character } from './models/character';
import { CharacterService } from './services/character-service';

function App() {
  const [characters, setCharacters] = useState<Array<Character>>();
  useEffect(() => {
    async function fetchCharacter() {
      const characterService = CharacterService.getInstance();

      const charactersResponse = await characterService.getAllCharacters(1);

      setCharacters(charactersResponse.results);
    }

    fetchCharacter();
  }, []);

  const characterList = () =>
    characters?.map((character) => (
      <CharacterItemComponent
        key={character.id}
        character={character}
      ></CharacterItemComponent>
    ));

  return <div className="App">{characterList()}</div>;
}

export default App;
