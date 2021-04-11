import { Character } from '../models/character';
import { Episode } from '../models/episode';

export class RecommendationService {
  private static instance: RecommendationService | undefined;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RecommendationService();
    }

    return this.instance;
  }

  public getRecommendedEpisodes(
    favoriteCharacters: Array<Character>
  ): Array<Episode> {
    const episodeCounts: {
      [key: number]: { total: number; episode: Episode };
    } = {};

    favoriteCharacters.forEach((character) => {
      character.episode.forEach((episode) => {
        if (!episodeCounts[episode.id]) {
          episodeCounts[episode.id] = { total: 0, episode };
        }

        episodeCounts[episode.id].total += 1;
      });
    });

    const sortedEpisodes = Object.values(episodeCounts).sort(
      (a, b) => b.total - a.total
    );

    return sortedEpisodes.map(({ episode }) => episode);
  }
}
