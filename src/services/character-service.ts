import { CharacterResults } from '../models/character-results';

export class CharacterService {
  private readonly graphqlEndpoint = 'https://rickandmortyapi.com/graphql';
  private static instance: CharacterService | undefined;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CharacterService();
    }

    return this.instance;
  }

  async fetchCharacters(
    page: number,
    nameSearch: string = ''
  ): Promise<CharacterResults> {
    const response = await fetch(this.graphqlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: this.getCharactersQuery(page, nameSearch),
      }),
    });

    const charactersResponse = await response.json();

    return charactersResponse.data.characters;
  }

  private getCharactersQuery(page: number, nameSearch: string): string {
    return `
      {
        characters(page: ${page}, filter: { name: "${nameSearch}" }) {
          info {
            pages
            next
            prev
          }
          results {
            id
            name
            status
            species
            gender
            image,
            origin {
              name
            }
            episode {
              id,
              name,
              episode
            }
          }
        }
      }
    `;
  }
}
