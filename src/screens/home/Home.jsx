import React, { useState } from "react";
import "./Home.css";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Header from "../../components/header/Header";
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";

const Home = () => {
  const [torrent, setTorrent] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});

  const showPlayer = torrent.hash;
  
  return (
    <div className="Home commonPage">
      <Header/>
      <MovieGrid/>
    </div>
  );
}

export default Home;
