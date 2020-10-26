import React from "react";
import { useParams } from "react-router-dom";
import "./Home.css";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Header from "../../components/header/Header";
import { movieFromResponse, Movie } from '../../domain/movie';
import { getSerieDto, Serie } from '../../domain/serie';
import { getAvailableGenres } from "../../repositories/genresRepository";
import { getTrendingMovies, getTrendingSeries, TMDBSerieResponse } from '../../services/api';

const Home = ({isSerie, type}: {isSerie: boolean, type: string}) => {
  const contentPerPage = 20;  
  const { genre } : {genre: string} = useParams();
  const genreObject = getAvailableGenres().find(g => g.value == genre) || getAvailableGenres()[0];

  const fetchSeriesPage = (actualPage : number, callback : (movies: Serie[]) => void)=> {
    getTrendingSeries(contentPerPage, actualPage, genreObject.value, (result: TMDBSerieResponse[]) => {
        callback(result.map(getSerieDto));
    })
  }

  const fetchMoviePage = (actualPage: number, callback : (movies: Movie[]) => void) => {     
    getTrendingMovies(contentPerPage, actualPage, genreObject.value, result => {
      callback(result.map(movieFromResponse));          
    });
  }

  const onMovieSelect = (movie: Movie) => `${process.env.PUBLIC_URL}/movie/${movie.imdbCode}`;
  const onSerieSelect = (serie: Serie) => `${process.env.PUBLIC_URL}/serie/${serie.id}`;


  return (
    <div className="Home commonPage">
      <Header isSerie={isSerie} genre={genre}/>
      <MovieGrid 
        genre={genreObject} 
        type={type} 
        fetchMethod={!isSerie ? fetchMoviePage : fetchSeriesPage} 
        elementsPerPage={contentPerPage}
        onSelect={!isSerie ? onMovieSelect : onSerieSelect}/>
    </div>
  );
}

export default Home;
