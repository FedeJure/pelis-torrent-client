import React, { useState, useEffect } from 'react'
import { getTrendingMovies } from '../api'
import { getMovieDto } from '../domain/movie'
import './MovieGrid.css'
const MovieGrid = () => {
    const [movies, setMovies] = useState([]);

    useEffect(async () => {
        const result = await getTrendingMovies(20, 1);
        setMovies(result.data.movies.map(getMovieDto));
    }, []);

    return (
        <div className="movieGrid">
            {movies.map(movie => (
                <div className="movieElement">
                    <img src={movie.image}/>
                    <span>{movie.title}</span>
                </div>
            ))}
        </div>
    )
};

export default MovieGrid;