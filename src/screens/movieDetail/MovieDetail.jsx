import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import moviesRepository from '../../repositories/moviesRepository';
import Header from '../../components/header/Header';
import PlayerView from "../../components/player/PlayerView";
import { getMovieCompleteData, getMovieTrailer } from "../../services/api";
import { getMovieDto } from "../../domain/movie";
import "./MovieDetail.css"

const MovieDetail = () => {
    const [torrent, setTorrent] = useState({});
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const { movieId } = useParams();

    const selectTorrent = torrent => {
        setTorrent(torrent);
    }

    useEffect(() => {
        var newMovie = moviesRepository.getMovie(movieId);
        getMovieTrailer(movieId, "en-US").then(res => {
            var trailer = res.results.find(v => v.site == "YouTube");
            var url = trailer ? `https://youtube.com/watch?v=${trailer.key}` : "";
            setTrailerUrl(url)
        });
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
            {movie && movie.backgroundImage && <img className="background" src={movie.backgroundImage}/> }
            {movie &&
            <Selector
                image={movie.image}
                torrents={movie.torrents}
                setTorrent={selectTorrent}
                details={movie.details}
                title={movie.title}
            />}
            <PlayerView torrent={torrent} movie={movie} trailerUrl={trailerUrl} />
        </div>
    )
};

export default MovieDetail;