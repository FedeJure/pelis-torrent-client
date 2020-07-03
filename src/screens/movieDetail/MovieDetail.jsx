import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import moviesRepository from '../../repositories/moviesRepository';
import Header from '../../components/header/Header';
import PlayerView from "../../components/player/PlayerView";
import { getMovieCompleteData } from "../../services/api";
import { getMovieDto } from "../../domain/movie";
import "./MovieDetail.css"

const MovieDetail = () => {
    const [torrent, setTorrent] = useState({});
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

    const selectTorrent = torrent => {
        setTorrent(torrent);
    }

    useEffect(() => {
        var newMovie = moviesRepository.getMovie(movieId);
        if (!newMovie) getMovieCompleteData(movieId).then(res => {
            const fetchedMovie = getMovieDto(res.data.movies[0]);
            setMovie(fetchedMovie);
            moviesRepository.saveMovie(fetchedMovie);
        });
        else setMovie(newMovie);
    }, []);

    return (
        <div className="movieDetail commonPage">
            <Header/>
            {movie && movie.backgroundImage && <img className="background fade-in" src={movie.backgroundImage}/> }
            {movie &&
            <Selector
                image={movie.image}
                torrents={movie.torrents}
                setTorrent={selectTorrent}
                details={movie.details}
                title={movie.title}
            />}
            <PlayerView torrent={torrent} movie={movie} />
        </div>
    )
};

export default MovieDetail;