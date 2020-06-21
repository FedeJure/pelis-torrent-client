import React, { useState, useEffect } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { getTrendingMovies } from '../api'
import { getMovieDto } from '../domain/movie'
import './MovieGrid.css'
import { loadOptions } from '@babel/core';
var time = 0;
const storageKey = "homeMovieList";

const MovieGrid = ({selectMovie, active}) => {
    const [movies, setMovies] = useState([]);
    const [actualPage,setActualPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    const getDto = movie => {
        return { ...getMovieDto(movie), delay: time++}
    }

    const fetchMoviePage = async () => {
        const count = 50;
        const cachedList = JSON.parse(localStorage.getItem(storageKey)) || [];
        console.log(cachedList)
        if (cachedList.length >= count) {
            const aux = [...movies, ...cachedList.slice(count*(actualPage-1), count)];
            setActualPage(actualPage + 1);
            setMovies(aux);
            time = 0;
            return;
        }
        getTrendingMovies(count, actualPage, result => {
            setActualPage(actualPage + 1);
            const aux = [...movies, ...result.data.movies.map(getDto)];
            setMovies(aux);    
            time = 0;
            localStorage.setItem(storageKey, JSON.stringify(aux));
        });
    }

    useEffect(() => {
        if (loadMore) fetchMoviePage();
    }, [loadMore]);


    const onVisivilityChange = async visible => {
        setLoadMore(visible);
    }

    return (
        active && <VisibilitySensor onChange={onVisivilityChange} partialVisibility="bottom" >
            <div className="movieGrid">
                {movies.map((movie) => (
                    <MovieElement movie={movie} onClick={_ => selectMovie(movie)} timeToInit={movie.delay * 10}/>
                ))}
            </div>
        </VisibilitySensor>
    )
};

const MovieElement = ({movie, onClick, timeToInit}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const effect = setTimeout(() => {
            setShow(true);
        },timeToInit);

        const cleanUp = () => {
            clearTimeout(effect);
        }

        return cleanUp;
        
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