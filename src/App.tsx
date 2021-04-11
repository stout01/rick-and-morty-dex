import { useEffect, useState } from 'react';
import './App.css';
import { CharacterItemComponent } from './components/character-item';
import { Character } from './models/character';

function App() {
  const [characters, setCharacters] = useState<Array<Character>>();
  useEffect(() => {
    async function fetchCharacter() {
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
              {
                characters(page: 1) {
                  info {
                    pages
                    next
                    prev
                  }
                  results {
                    name
                    status
                    species
                    gender
                    image
                  }
                }
              }
            `,
        }),
      });

      const charactersResponse = await response.json();

      setCharacters(charactersResponse.data.characters.results);
    }

    fetchCharacter();
  });

  const characterList = () =>
    characters?.map((character) => (
      <CharacterItemComponent character={character}></CharacterItemComponent>
    ));

  return <div className="App">{characterList()}</div>;
}

export default App;
