import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function AppMenuBar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" component={Link} to="/characters">
          Characters
        </Button>
        <Button color="inherit" component={Link} to="/recommended-episodes">
          Recommended Episodes
        </Button>
      </Toolbar>
    </AppBar>
  );
}
