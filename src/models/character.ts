import { Episode } from './episode';
import { Location } from './link';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  image: string;
  episode: Array<Episode>;
}
