import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { getTrendingMovies } from '../../services/api';
import { getMovieDto } from '../../domain/movie';
import MovieElement, { EmptyMovieElement } from '../../components/movieElement/MovieElement';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import MoviesGridRepository from "../../repositories/moviesGridRepository";
import { MEDIA_TYPES } from '../../domain/mediaTypes';
import './MovieGrid.css';

const storageKey = "homeMovieList";

const MovieGrid = ({genre, type}) => {
    const moviesPerPage = 20;
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
        const startIndex = (actualPage - 1) * moviesPerPage;
        addDefaultMovies();        
        getTrendingMovies(moviesPerPage, actualPage, genre.value, result => {
            const newMoviesDto = result.data.movies.map(getDto);
            addNewMovies(newMoviesDto, startIndex);           
        });
    }

    const addNewMovies = (newMovies, fromIndex) => {
        const oldMovies = movies;
        oldMovies.splice(fromIndex, moviesPerPage, ...dtoListToElementList(newMovies));
        setMovies(oldMovies);
        setLoadMore(true);
    }

    useEffect(() => {
        setMovies([]);
        setActualPage(1);
    }, [genre]);

    useEffect(() => {
        fetchMoviePage();
    },[])

    const addDefaultMovies = () => {
        const movie = <EmptyMovieElement name="empty"/>;
        const defaultMovies = [];
        for (let index = 0; index < 20; index++) {
            defaultMovies.push(movie);
        }
        setMovies([...movies, ...defaultMovies]);
        setActualPage(actualPage + 1);
        setLoadMore(false);
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
                loadMore={fetchMoviePage}
                hasMore={loadMore}
                loader={<div className="loader" key={0}></div>}>
                    <div className="movieGrid">
                        {movies}
                    </div>
            </InfiniteScroll>
        </div>
    )
};

export default MovieGrid;