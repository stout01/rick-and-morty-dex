import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function AppMenuBar() {
  return (
    <AppBar position="static">
      <Toolbar>
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
