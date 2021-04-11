import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import AppMenuBar from './components/app-menu-bar';
import CharactersPage from './components/characters-page';
import RecommendedEpisodes from './components/recommended-episodes';
import { Character } from './models/character';
import { Episode } from './models/episode';
import { RecommendationService } from './services/recommendation-service';

function App() {
  const [recommendedEpisodes, setRecommendedEpisodes] = useState<
    Array<Episode>
  >();
  const [favoriteCharacters, setFavoriteCharacters] = useState<{
    [key: number]: Character;
  }>({});

  useEffect(() => {
    const recommendationService = RecommendationService.getInstance();
    const episodes = recommendationService.getRecommendedEpisodes(
      Object.values(favoriteCharacters)
    );

    setRecommendedEpisodes(episodes);
  }, [favoriteCharacters]);

  return (
    <Router>
      <AppMenuBar></AppMenuBar>
      <Switch>
        <Route path="/recommended-episodes">
          <RecommendedEpisodes episodes={recommendedEpisodes} />
        </Route>
        <Route path="/characters">
          <CharactersPage
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        </Route>
        <Route path="/">
          <Redirect to="/characters"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
