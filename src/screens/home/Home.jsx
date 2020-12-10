import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Home.css";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Header from "../../components/header/Header";
import Routes from "../../services/router";
import { getMovieDto } from '../../domain/movie';
import { getSerieDto } from '../../domain/serie';
import { getAvailableGenres, getDefaultGenre } from "../../repositories/genresRepository";
import { getTrendingMovies, getTrendingSeries, getImdbId, getMovieCompleteData } from '../../services/api';

import MoviesRepository from "../../repositories/moviesRepository";

const Home = ({isSerie, type}) => {
  const contentPerPage = 20;  
  const [torrent, setTorrent] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(getDefaultGenre())
  const showPlayer = torrent.hash;
  const history = useHistory();
  const { genre } = useParams();

  const fetchSeriesPage = async (actualPage, callback) => {
    getTrendingSeries(contentPerPage, actualPage, selectedGenre.value, result => {
        callback(result.results.map(getSerieDto));
    })
  }

  const fetchMoviePage = async (actualPage, callback) => {     
    getTrendingMovies(contentPerPage, actualPage, selectedGenre.value, result => {
      callback(result.results.map(getMovieDto));          
    });
  }

  const onMovieSelect = movie => `${process.env.PUBLIC_URL}/movie/${movie.id}`;
  const onSerieSelect = serie => `${process.env.PUBLIC_URL}/serie/${serie.id}`;

  useEffect(() => {
    getAvailableGenres().then(genres => {
      const selected = genres.find(g => g.value == genre) || selectedGenre;
      setSelectedGenre(selected);
    })
  }, []);


  return (
    <div className="Home commonPage">
      <Header isSerie={isSerie} genre={selectedGenre}/>
      <MovieGrid 
        genre={selectedGenre} 
        type={type} 
        fetchMethod={!isSerie ? fetchMoviePage : fetchSeriesPage} 
        elementsPerPage={contentPerPage}
        onSelect={!isSerie ? onMovieSelect : onSerieSelect}/>
    </div>
  );
}

export default Home;
