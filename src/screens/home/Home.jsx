import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Home.css";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Header from "../../components/header/Header";
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import { getAvailableGenres } from "../../repositories/genresRepository";

const Home = () => {
  const [torrent, setTorrent] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedGenre, setSelectedGenre] = useState({value: null})
  const showPlayer = torrent.hash;
  const history = useHistory();
  const { genre } = useParams();
  const genreObject = getAvailableGenres().find(g => g.value == genre);

  const onGenreChange = genre => {
    if (!genre.value) history.push(Routes.getHomeRoute());
    else history.push(Routes.getHomeRouteWithGenre(genre.value));
    window.location.reload();
  };

  const onTypeChange = type => {
    // console.log(type);
  }
  
  return (
    <div className="Home commonPage">
      <Header onGenreSelected={onGenreChange} onTypeSelected={onTypeChange}/>
      <MovieGrid genre={genreObject || selectedGenre}/>
    </div>
  );
}

export default Home;
