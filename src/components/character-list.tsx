import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Character } from '../models/character';

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
      textAlign: 'initial',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

type CharacterListProps = {
  characters?: Array<Character>;
  favoriteCharacters: { [id: number]: Character };
  setFavorite: (id: number, character: Character) => void;
};

export default function CharacterList({
  characters,
  favoriteCharacters,
  setFavorite: toggleFavorite,
}: CharacterListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {characters?.map((character) => (
        <GridListTile key={character.id}>
          <img src={character.image} alt={character.name} />
          <GridListTileBar
            title={character.name}
            subtitle={<span>Origin: {character.origin.name}</span>}
            actionIcon={
              <IconButton
                aria-label={`info about ${character.name}`}
                className={classes.icon}
                onClick={() => toggleFavorite(character.id, character)}
              >
                {favoriteCharacters[character.id] ? (
                  <Favorite data-testid="FavoriteIcon" />
                ) : (
                  <FavoriteBorder data-testid="FavoriteBorderIcon" />
                )}
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </div>
  );
}
