import React, { useState } from "react";
import "./Home.css";
import MovieGrid from "../movieGrid/MovieGrid";
import Header from "../header/Header";
import Routes from "../router";
import MoviesRepository from "../repositories/moviesRepository";

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
