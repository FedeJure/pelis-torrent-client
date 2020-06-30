import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import HomeScreen from '../home/Home';
import MovieDetailScreen from '../movieDetail/MovieDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/movie/:movieId">
          <MovieDetailScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
