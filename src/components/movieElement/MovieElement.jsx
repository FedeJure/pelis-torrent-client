import React, { useState } from 'react'
import './MovieElement.css'

const MovieElement = ({movie, onSelect}) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <><a className={`movieElement ${!loaded ? "emptyMovieElement" : ""}`} key={movie.title} href={onSelect(movie)}>
            <img src={movie.image} onLoad={() => setLoaded(true)} style={{display: loaded? "unset": "none"}}/>
            {!loaded && <img src={process.env.PUBLIC_URL + "/imageLoading.gif"}/>}
            <p>{movie.title}</p>
            <span>{movie.year}</span>
        </a>
        {!loaded && <EmptyMovieElement/>}
        </>
    );
};

const EmptyMovieElement = () => (
    <div className="movieElement emptyMovieElement" key={Math.random()}>
        <img src={process.env.PUBLIC_URL + "/imageLoading.gif"}/>
    </div>
);

export default MovieElement;
export { EmptyMovieElement };