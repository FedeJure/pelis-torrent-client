import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { getTrendingMovies } from '../../services/api';
import { getMovieDto } from '../../domain/movie';
import MovieElement from '../../components/movieElement/MovieElement';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import MoviesGridRepository from "../../repositories/moviesGridRepository";
import './MovieGrid.css';

const storageKey = "homeMovieList";

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [actualPage,setActualPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const history = useHistory();
    

    const selectMovie = movie => {
        MoviesRepository.saveMovie(movie);
        history.push(Routes.getMovieUrl(movie.imdbCode));
        window.location.reload();
    }

    const getDto = movie => {
        return getMovieDto(movie);
    }

    const dtoListToElementList = dtoList => {
        return dtoList.map(dto => (
            <MovieElement movie={dto} onClick={_ => selectMovie(dto)}/>
        ));
    }

    const fetchMoviePage = async () => {
        const count = 50;
        const cachedList = MoviesGridRepository.getMovies();
        if (cachedList.length > count * actualPage) {
            const aux = [...movies, ...dtoListToElementList(cachedList.slice(count*(actualPage-1), count*actualPage))];
            setActualPage(actualPage + 1);
            setMovies(aux);
            return;
        }
        getTrendingMovies(count, actualPage, result => {
            const newMoviesDto = result.data.movies.map(getDto);
            const aux = [...movies, ...dtoListToElementList(newMoviesDto)];
            MoviesGridRepository.saveNewMovies(newMoviesDto);
            setMovies(aux);    
            setActualPage(actualPage + 1);
        });
    }

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchMoviePage}
            hasMore={true}
            loader={<div className="loader" key={0}>Loading ...</div>}>
                <div className="movieGrid">
                    {movies}
                </div>
        </InfiniteScroll>
    )
};

export default MovieGrid;