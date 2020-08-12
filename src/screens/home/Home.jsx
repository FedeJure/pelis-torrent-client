import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Home.css";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Header from "../../components/header/Header";
import Routes from "../../services/router";
import { getMovieDto } from '../../domain/movie';
import { getSerieDto } from '../../domain/serie';
import { getAvailableGenres } from "../../repositories/genresRepository";
import { getTrendingMovies, getTrendingSeries, getImdbId, getMovieCompleteData } from '../../services/api';

import MoviesRepository from "../../repositories/moviesRepository";

const Home = ({isSerie, type}) => {
  const contentPerPage = 20;  
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
    if (type.value == 'serie') history.push(Routes.getHomeSeriesRoute());
    else history.push(Routes.getHomeRoute());
    window.location.reload();
  }

  const fetchSeriesPage = async (actualPage, callback) => {
    getTrendingSeries(contentPerPage, actualPage, genreObject.value, result => {
        callback(result.results.map(getSerieDto));
    })
  }

  const fetchMoviePage = async (actualPage, callback) => {     
    getTrendingMovies(contentPerPage, actualPage, genreObject.value, result => {
      callback(result.data.movies.map(getMovieDto));          
    });
  }

  const onMovieSelect = movie => `${process.env.PUBLIC_URL}/movie/${movie.imdbCode}`;
  const onSerieSelect = serie => `${process.env.PUBLIC_URL}/serie/${serie.id}`;

  const onSelectMovieOnHeader = async movieId => {
    if (!movieId) return;
    const { imdb_id } = await getImdbId(movieId);
    const { data } = await getMovieCompleteData(imdb_id);
    if (data.movies && data.movies.length > 0) {
      const movie = getMovieDto(data.movies[0]);
      MoviesRepository.saveMovie(movie);
      history.push(Routes.getMovieUrl(movie.imdbCode));
      window.location.reload();
    }
  }

  const onSelectSerieOnHeader = serieId => {
    console.log("Click on serie: "+ serieId);
  }
  
  return (
    <div className="Home commonPage">
      <Header 
        onGenreSelected={onGenreChange}
        onTypeSelected={onTypeChange}
        onSelectContent={!isSerie ? onSelectMovieOnHeader : onSelectSerieOnHeader}/>
      <MovieGrid 
        genre={genreObject || selectedGenre} 
        type={type} 
        fetchMethod={!isSerie ? fetchMoviePage : fetchSeriesPage} 
        elementsPerPage={contentPerPage}
        onSelect={!isSerie ? onMovieSelect : onSerieSelect}/>
    </div>
  );
}

export default Home;
