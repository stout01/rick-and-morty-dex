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

  async getAllCharacters(page: number): Promise<CharacterResults> {
    const response = await fetch(this.graphqlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: this.getCharactersQuery(page),
      }),
    });

    const charactersResponse = await response.json();

    return charactersResponse.data.characters;
  }

  private getCharactersQuery(page: number): string {
    return `
      {
        characters(page: ${page}) {
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
            image
          }
        }
      }
    `;
  }
}
