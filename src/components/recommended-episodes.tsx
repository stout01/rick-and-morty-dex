import { Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import { Episode } from '../models/episode';

type RecommendedEpisodesProps = {
  episodes?: Array<Episode>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function RecommendedEpisodes({
  episodes,
}: RecommendedEpisodesProps) {
  const classes = useStyles();

  return (
    <Container>
      <List className={classes.root}>
        {episodes?.map((episode) => (
          <ListItem key={episode.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItem
              button
              component="a"
              href={`https://rickandmorty.fandom.com/wiki/${episode.name.replaceAll(
                ' ',
                '_'
              )}`}
              target="_blank"
            >
              <ListItemText
                primary={episode.episode}
                secondary={episode.name}
              />
            </ListItem>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
