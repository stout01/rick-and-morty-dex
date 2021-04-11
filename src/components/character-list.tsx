import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder } from '@material-ui/icons';
import { CharacterResults } from '../models/character-results';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

type CharacterListProps = {
  characterResults?: CharacterResults;
};

export default function CharacterList({
  characterResults,
}: CharacterListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={'auto'} cols={4}>
        {characterResults?.results.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.image} alt={tile.name} />
            <GridListTileBar
              title={tile.name}
              subtitle={<span>Status: {tile.status}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.name}`}
                  className={classes.icon}
                >
                  <FavoriteBorder />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
