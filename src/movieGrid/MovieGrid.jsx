import React, { useState, useEffect } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import InfiniteScroll from 'react-infinite-scroller'
import { getTrendingMovies } from '../api'
import { getMovieDto } from '../domain/movie'
import './MovieGrid.css'
import { loadOptions } from '@babel/core';

const storageKey = "homeMovieList";

const MovieGrid = ({selectMovie, active}) => {
    const [movies, setMovies] = useState([]);
    const [actualPage,setActualPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    const getDto = movie => {
        return getMovieDto(movie);
    }

    const saveNewMoviesInStorage = newMovies => {
        const oldMovies = JSON.parse(localStorage.getItem(storageKey)) || [];
        localStorage.setItem(storageKey, JSON.stringify([...oldMovies, ...newMovies]));
    }

    const dtoListToElementList = dtoList => {
        return dtoList.map(dto => (
            <MovieElement movie={dto} onClick={_ => selectMovie(dto)}/>
        ));
    }

    const fetchMoviePage = async () => {
        const count = 50;
        const cachedList = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (cachedList.length > count * actualPage) {
            const aux = [...movies, ...dtoListToElementList(cachedList.slice(count*(actualPage-1), count*actualPage))];
            setActualPage(actualPage + 1);
            setMovies(aux);
            return;
        }
        getTrendingMovies(count, actualPage, result => {
            const newMoviesDto = result.data.movies.map(getDto);
            const aux = [...movies, ...dtoListToElementList(newMoviesDto)];
            saveNewMoviesInStorage(newMoviesDto);
            setMovies(aux);    
            setActualPage(actualPage + 1);
        });
    }

    return (
        active && <InfiniteScroll
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

const MovieElement = ({movie, onClick}) => (
    <div className={`movieElement animate__animated animate__zoomIn`} key={movie.title} onClick={onClick}>
        <img src={movie.image}/>
        <p>{movie.title}</p>
        <span>{movie.year}</span>
    </div>
);
export default MovieGrid;