import { Character } from './character';
import { PaginationInfo } from './pagination-info';

export interface CharacterResults {
  results: Array<Character>;
  info: PaginationInfo;
}
