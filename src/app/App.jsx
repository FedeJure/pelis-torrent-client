import React, { useState } from "react";
import Select from 'react-select'
import "./App.css";
import PlayerView from "../player/PlayerView";
import SearchBar from "../searchBar/SearchBar";
import Selector from "../selector/Selector";
import { getImdbId, getMovieCompleteData } from '../api'
import { getMovieDto } from '../domain/movie'

function App() {
  const [language, setLanguage] = useState('en-US');
  const [torrent, setTorrent] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});

  const onChange = async movieId => {
    const { imdb_id } = await getImdbId(movieId);
    const { data } = await getMovieCompleteData(imdb_id);
    if (data.movies.length > 0)
      setSelectedMovie(getMovieDto(data.movies[0]));
  };

  const onSelectLanguage = selected => {
    setLanguage(selected.value);
  }

  const showSelector =
    selectedMovie.torrents && selectedMovie.torrents.length > 0;
  const showPlayer = torrent.hash;

  const languages = [
    { value: 'en-US', label: 'English' },
    { value: 'es-ES', label: 'Español' }
  ]
  return (
    <div className="App">
      <Select options={languages} onChange={onSelectLanguage}/>
      <SearchBar onChange={onChange} language={language} className="searchBar" />
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
