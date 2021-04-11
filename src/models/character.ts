import { Link } from './link';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Link;
  location: Link;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}
