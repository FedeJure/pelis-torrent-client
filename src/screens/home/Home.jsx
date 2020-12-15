import React, { useState, useEffect } from "react";
import "./Home.css";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Header from "../../components/header/Header";
import Routes from "../../services/router";
import { getMovieDto } from '../../domain/movie';
import { getSerieDto } from '../../domain/serie';
import { getAvailableGenres, getDefaultGenre } from "../../repositories/genresRepository";
import { getTrendingMovies, getTrendingSeries} from '../../services/api';
import { MediaTypeRepository } from "../../repositories/sessionStateRepository";

const Home = () => {
  const mediaTypeRepository = MediaTypeRepository.useContainer();
  const isSerie = mediaTypeRepository.type.value == "serie"
  const contentPerPage = 20;  
  const [selectedGenre, setSelectedGenre] = useState(getDefaultGenre())

  const fetchSeriesPage = async (actualPage, callback) => {
    getTrendingSeries(contentPerPage, actualPage, mediaTypeRepository.genre.value, result => {
        callback(result.results.map(getSerieDto));
    })
  }

  const fetchMoviePage = async (actualPage, callback) => {     
    getTrendingMovies(contentPerPage, actualPage, mediaTypeRepository.genre.value, result => {
      callback(result.results.map(getMovieDto));          
    });
  }

  const onMovieSelect = movie => `${process.env.PUBLIC_URL}${Routes.getMovieUrl(movie.id, movie.title)}`;
  const onSerieSelect = serie => `${process.env.PUBLIC_URL}${Routes.getSerieUrl(serie.id, null, null, serie.title)}`;

  useEffect(() => {
    getAvailableGenres().then(genres => {
      const selected = genres.find(g => g.value == mediaTypeRepository.genre) || selectedGenre;
      setSelectedGenre(selected);
    })
  }, []);

  return (
    <div className="Home commonPage">
      <Header isSerie={isSerie} genre={mediaTypeRepository.genre}/>
      <MovieGrid 
        genre={mediaTypeRepository.genre} 
        type={mediaTypeRepository.type} 
        fetchMethod={!isSerie ? fetchMoviePage : fetchSeriesPage} 
        elementsPerPage={contentPerPage}
        onSelect={!isSerie ? onMovieSelect : onSerieSelect}/>
    </div>
  );
}

export default Home;
