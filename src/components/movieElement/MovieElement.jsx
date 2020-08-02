import React from 'react'
import './MovieElement.css'

const MovieElement = ({movie, onClick}) => (
    <div className="movieElement" key={movie.title} onClick={onClick}>
        <img src={movie.image}/>
        <p>{movie.title}</p>
        <span>{movie.year}</span>
    </div>
);

const EmptyMovieElement = () => (
    <div className="movieElement emptyMovieElement" key={Math.random()}>
        <img src={process.env.PUBLIC_URL + "/imageLoading.gif"}/>
    </div>
);

export default MovieElement;
export { EmptyMovieElement };