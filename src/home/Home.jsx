import React, { useState } from "react";
import "./Home.css";
import PlayerView from "../player/PlayerView";
import Selector from "../selector/Selector";
import MovieGrid from "../movieGrid/MovieGrid";
import Header from "../header/Header";

function App() {
  const [torrent, setTorrent] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});

  const showSelector =
    selectedMovie.torrents && selectedMovie.torrents.length > 0;
  const showPlayer = torrent.hash;

  const onSelectMovie = movie => {
    setSelectedMovie(movie);
  }
  
  return (
    <div className="App">
      <Header onSelectMovie={onSelectMovie}/>
      <MovieGrid selectMovie={onSelectMovie} active={!showSelector}/>
      {showSelector && (
        <Selector
          image={selectedMovie.image}
          torrents={selectedMovie.torrents}
          setTorrent={setTorrent}
          details={selectedMovie.details}
          title={selectedMovie.title}
        />
      )}
      {showPlayer && (
        <PlayerView torrentId={torrent.hash} image={selectedMovie.image} />
      )}
    </div>
  );
}

export default App;
