import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import HomeScreen from '../screens/home/Home';
import MovieDetailScreen from '../screens/movieDetail/MovieDetail';
import SerieDetailScreen from '../screens/serieDetail/SerieDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/series">
          <>
            <HomeScreen isSerie={true}/>
          </>
        </Route>
        <Route exact path="/genre/:genre">
          <>
            <HomeScreen />
          </>
        </Route>
        <Route exact path="/">
          <>
            <HomeScreen />
          </>
        </Route>
        <Route exact path="/movie/:movieId">
          <>
          <MovieDetailScreen />
          </>
        </Route>
        <Route exact path="/serie/:serieId">
          <>
          <SerieDetailScreen />
          </>
        </Route>
        <Route exact path="/serie/:serieId/:season/:episode">
          <>
          <SerieDetailScreen />
          </>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
