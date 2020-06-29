import React from 'react'
import './MovieElement.css'

const MovieElement = ({movie, onClick}) => (
    <div className={`movieElement`} key={movie.title} onClick={onClick}>
        <img src={movie.image}/>
        <p>{movie.title}</p>
        <span>{movie.year}</span>
    </div>
);

export default MovieElement;