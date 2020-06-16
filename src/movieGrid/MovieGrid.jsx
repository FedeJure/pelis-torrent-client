import React, { useState, useEffect } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { getTrendingMovies } from '../api'
import { getMovieDto } from '../domain/movie'
import './MovieGrid.css'
import { loadOptions } from '@babel/core';
import 'animate.css'
var time = 0;
const MovieGrid = ({selectMovie, active}) => {
    const [movies, setMovies] = useState([]);
    const [actualPage,setActualPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    const fetchMoviePage = async () => {
        getTrendingMovies(50, actualPage, result => {
            setActualPage(actualPage + 1);
            const aux = [...movies, ...result.data.movies.map(getMovieDto)];
            setMovies(aux);
        });
        time = 0;
    }

    useEffect(() => {
        if (loadMore) fetchMoviePage();
    }, [movies, loadMore]);


    const onVisivilityChange = async visible => {
        setLoadMore(visible);
    }

    return (
        active && <VisibilitySensor onChange={onVisivilityChange} partialVisibility="bottom" >
            <div className="movieGrid">
                {movies.map((movie) => (
                    <MovieElement movie={movie} onClick={_ => selectMovie(movie)} timeToInit={100*time++}/>
                ))}
            </div>
        </VisibilitySensor>
    )
};

const MovieElement = ({movie, onClick, timeToInit}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        },timeToInit);
    });

    return (
        show && <div className={`movieElement animate__animated animate__zoomIn`} key={movie.title} onClick={onClick}>
            <img src={movie.image}/>
            <p>{movie.title}</p>
            <span>{movie.year}</span>
        </div>
    )
}
export default MovieGrid;