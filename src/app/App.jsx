import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import HomeScreen from '../screens/home/Home';
import MovieDetailScreen from '../screens/movieDetail/MovieDetail';
import SerieDetailScreen from '../screens/serieDetail/SerieDetail';
import {MediaTypeRepository} from "../repositories/sessionStateRepository";

function App() {

  return (
    <Router>
      <InnerApp/>
    </Router>
  );
}

function InnerApp() {
  return (
    <Switch>
    <Route exact path="/series">
      <>
      <MediaTypeRepository.Provider><HomeScreen isSerie={true}/></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/series/genre/:genre">
      <>
      <MediaTypeRepository.Provider><HomeScreen isSerie={true}/></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/movies/genre/:genre">
      <>
      <MediaTypeRepository.Provider><HomeScreen /></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/">
      <>
      <MediaTypeRepository.Provider><HomeScreen /></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/movies">
      <>
      <MediaTypeRepository.Provider><HomeScreen /></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/movie/:title/:movieId">
      <>
      <MediaTypeRepository.Provider><MovieDetailScreen /></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/serie/:title/:serieId">
      <>
      <MediaTypeRepository.Provider><SerieDetailScreen /></MediaTypeRepository.Provider>
      </>
    </Route>
    <Route exact path="/serie/:title/:serieId/:season/:episode">
      <>
      <MediaTypeRepository.Provider><SerieDetailScreen /></MediaTypeRepository.Provider>
      </>
    </Route>
  </Switch>
  );
}

export default App;
