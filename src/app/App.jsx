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
            <img src={process.env.PUBLIC_URL + "/under_construction1.png"} alt="site under construction" className="underConstructionImage" />
          </>
        </Route>
        <Route exact path="/genre/:genre">
          <>
            <HomeScreen />
            <img src={process.env.PUBLIC_URL + "/under_construction1.png"} alt="site under construction" className="underConstructionImage" />
          </>
        </Route>
        <Route exact path="/">
          <>
            <HomeScreen />
            <img src={process.env.PUBLIC_URL + "/under_construction1.png"} alt="site under construction" className="underConstructionImage" />
          </>
        </Route>
        <Route exact path="/movie/:movieId">
          <>
          <MovieDetailScreen />
            <img src={process.env.PUBLIC_URL + "/under_construction1.png"} alt="site under construction" className="underConstructionImage" />
          </>
        </Route>
        <Route exact path="/serie/:serieId">
          <>
          <SerieDetailScreen />
            <img src={process.env.PUBLIC_URL + "/under_construction1.png"} alt="site under construction" className="underConstructionImage" />
          </>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
