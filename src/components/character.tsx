import { Character } from '../models/character';
import './character.css';

type CharacterComponentProps = {
  character?: Character;
};

export const CharacterComponent = ({ character }: CharacterComponentProps) => {
  if (!character) {
    return null;
  }

  return (
    <div className="character">
      <img src={character.image} alt="Profile"></img>
      <div>Name: {character.name}</div>
      <div>Status: {character.status}</div>
      <div>Species: {character.species}</div>
      <div>Gender: {character.gender}</div>
    </div>
  );
};
