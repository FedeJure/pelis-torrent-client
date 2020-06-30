import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import moviesRepository from '../../repositories/moviesRepository';
import Header from '../../components/header/Header';
import PlayerView from "../../components/player/PlayerView";

const MovieDetail = () => {
    const [torrent, setTorrent] = useState({});
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    useEffect(() => {
        var newMovie = moviesRepository.getMovie(movieId);
        if (!newMovie) {
            //fetch from backend
        }
        setMovie(newMovie);
    }, []);

    return (
        <div className="movieDetail commonPage">
            <Header/>
            {movie && 
            <Selector
                image={movie.image}
                torrents={movie.torrents}
                setTorrent={setTorrent}
                details={movie.details}
                title={movie.title}
            />}
            {torrent.hash && <PlayerView torrentId={torrent.hash} image={movie.image} />}
        </div>
    )
};

export default MovieDetail;