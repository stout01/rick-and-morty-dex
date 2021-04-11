import { useEffect, useState } from 'react';
import './App.css';
import { CharacterComponent } from './components/character';
import { Character } from './models/character';

function App() {
  const [characters, setCharacters] = useState<Array<Character>>();
  useEffect(() => {
    async function fetchCharacter() {
      const response = await fetch(
        'https://rickandmortyapi.com/api/character',
        { method: 'GET' }
      );

      const charactersResponse = await response.json();

      setCharacters(charactersResponse.results);
    }

    fetchCharacter();
  });

  const characterList = () =>
    characters?.map((character) => (
      <CharacterComponent character={character}></CharacterComponent>
    ));

  return <div className="App">{characterList()}</div>;
}

export default App;
