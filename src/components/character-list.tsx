import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Character } from '../models/character';
import { CharacterResults } from '../models/character-results';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'grid',
      gridGap: '1rem',
      gridTemplateColumns: 'repeat(auto-fill, 16rem)',
      justifyContent: 'space-around',
      listStyle: 'none',
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

type CharacterListProps = {
  characterResults?: CharacterResults;
  favoriteCharacters: { [key: number]: Character };
  setFavorite: (id: number, character: Character) => void;
};

export default function CharacterList({
  characterResults,
  favoriteCharacters,
  setFavorite: toggleFavorite,
}: CharacterListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <GridList cellHeight={'auto'} cols={4}> */}
      {characterResults?.results.map((character) => (
        <GridListTile key={character.id}>
          <img src={character.image} alt={character.name} />
          <GridListTileBar
            title={character.name}
            subtitle={<span>Status: {character.status}</span>}
            actionIcon={
              <IconButton
                aria-label={`info about ${character.name}`}
                className={classes.icon}
                onClick={() => toggleFavorite(character.id, character)}
              >
                {favoriteCharacters[character.id] ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            }
          />
        </GridListTile>
      ))}
      {/* </GridList> */}
    </div>
  );
}
