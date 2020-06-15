import React, { useState, useEffect } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { getTrendingMovies } from '../api'
import { getMovieDto } from '../domain/movie'
import './MovieGrid.css'
import { loadOptions } from '@babel/core';
const MovieGrid = ({selectMovie, active}) => {
    const [movies, setMovies] = useState([]);
    const [actualPage,setActualPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    const fetchMoviePage = async () => {
        const result = await getTrendingMovies(20, actualPage);
        setActualPage(actualPage + 1);
        const aux = [...movies, ...result.data.movies.map(getMovieDto)];
        setMovies(aux);
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

                    <div className="movieElement" key={movie.title} onClick={_ => selectMovie(movie)}>
                        <img src={movie.image}/>
                        <p>{movie.title}</p>
                        <span>{movie.year}</span>
                    </div>
                ))}
            </div>
        </VisibilitySensor>
    )
};

const MovieElement = (title, image, year) => {

}
export default MovieGrid;