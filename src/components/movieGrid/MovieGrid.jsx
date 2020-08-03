import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { getTrendingMovies } from '../../services/api';
import { getMovieDto } from '../../domain/movie';
import MovieElement, { EmptyMovieElement } from '../../components/movieElement/MovieElement';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import MoviesGridRepository from "../../repositories/moviesGridRepository";
import './MovieGrid.css';

const storageKey = "homeMovieList";

const MovieGrid = ({genre}) => {
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
            <MovieElement movie={dto} onClick={_ => selectMovie(dto)} id={dto.id}/>
        ));
    }

    const fetchMoviePage = async () => {
        addDefaultMovies();
        const count = 50;
        const cachedList = MoviesGridRepository.getMovies();
        if (cachedList.length > count * actualPage) {
            const oldMovies = removeDefaultMovies(movies);
            const aux = [...oldMovies, ...dtoListToElementList(cachedList.slice(count*(actualPage-1), count*actualPage))];
            setActualPage(actualPage + 1);
            setMovies(aux);
            return;
        }
        getTrendingMovies(count, actualPage, genre.value, result => {
            const newMoviesDto = result.data.movies.map(getDto);
            const oldMovies = removeDefaultMovies(movies);
            const aux = [...oldMovies, ...dtoListToElementList(newMoviesDto)];
            MoviesGridRepository.saveNewMovies(newMoviesDto);
            setMovies(aux);    
            setActualPage(actualPage + 1);
        });
    }

    const fetchWithGenre = async () => {
        const count = 50;
        addDefaultMovies();
        getTrendingMovies(count, actualPage, genre.value, result => {
            if (!result.data.movies) {
                fetchMoviePage();
                return;
            }
            const newMoviesDto = result.data.movies.map(getDto);
            const oldMovies = removeDefaultMovies(movies);
            const aux = [...oldMovies, ...dtoListToElementList(newMoviesDto)];
            setMovies(aux);    
            setActualPage(actualPage + 1);
        });
    };

    useEffect(() => {
        setMovies([]);
        setActualPage(0);
    }, [genre]);

    const addDefaultMovies = () => {
        const movie = <EmptyMovieElement name="empty"/>;
        const defaultMovies = [];
        for (let index = 0; index < 20; index++) {
            defaultMovies.push(movie);
            console.log(movie)
        }
        setMovies([...movies, defaultMovies]);
    };

    const removeDefaultMovies = (providedMovies) => {
        const actualMovies = providedMovies.filter(element => element.props && element.props.name != "empty")
        return actualMovies;
    };

    return (
        <div className="movieGridContainer">
            <p>{genre.value ? genre.label : "Last Releases"}: <img className="titleBackground" src={process.env.PUBLIC_URL + "/titleBackground.svg"}/></p>
            <InfiniteScroll
                pageStart={0}
                loadMore={genre.value ? fetchWithGenre : fetchMoviePage}
                hasMore={true}
                loader={<div className="loader" key={0}></div>}>
                    <div className="movieGrid">
                        {movies}
                    </div>
            </InfiniteScroll>
        </div>
    )
};

export default MovieGrid;