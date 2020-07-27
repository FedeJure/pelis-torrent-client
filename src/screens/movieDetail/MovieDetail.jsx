import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import moviesRepository from '../../repositories/moviesRepository';
import Header from '../../components/header/Header';
import PlayerView from "../../components/player/PlayerView";
import { getMovieCompleteData, getMovieTrailer, getSubtitles } from "../../services/api";
import { getTorrentUrl } from '../../WebtorrentClient/WebtorrentClient';
import { getMovieDto } from "../../domain/movie";
import "./MovieDetail.css"

const MovieDetail = () => {
    const [movie, setMovie] = useState(null);
    const [selectedTorrents, setSelectedTorrents] = useState({});
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoReady, setVideoReady] = useState({hash: '', url: ''});
    const [showTrailer, setShowTrailer] = useState(true);
    const [availableSubtitles, setAvailableSubtitles] = useState([]);
    const { movieId } = useParams();

    const selectTorrent = torrent => {
        const torrents = {...selectedTorrents};
        if (torrent.hash && !selectedTorrents[torrent.hash]) {
            getTorrentUrl(torrent.hash)
            .then(url => setVideoReady({hash: torrent.hash, url}))
            .catch(error => console.error(error));

            const newTorrents = {...selectedTorrents, [torrent.hash]: {ready: false, url: ''} };
            setSelectedTorrents(newTorrents);
            setTorrentLoading(torrent.hash);
            return;
        }
        if (torrent.hash && selectedTorrents[torrent.hash] && selectedTorrents[torrent.hash].ready) {
            setVideoUrl(selectedTorrents[torrent.hash].url);
            setShowTrailer(false);
        }
    }

    const setTorrentLoading = hash => {
        const updatedMovie = {...movie};
        updatedMovie.torrents = updatedMovie.torrents.map(t => t.hash == hash ? {...t, loading: true} : t);
        setMovie(updatedMovie);
    };

    const setTorrentReady = hash => {
        const updatedMovie = {...movie};
        updatedMovie.torrents = updatedMovie.torrents.map(t => t.hash == hash ? {...t, ready: true} : t);
        setMovie(updatedMovie);
    };

    useEffect(() => {
        const torrents = {...selectedTorrents};
        
        if (!torrents[videoReady.hash]) return;
        torrents[videoReady.hash].url = videoReady.url;
        torrents[videoReady.hash].ready = true;
        setSelectedTorrents(torrents);
        setTorrentReady(videoReady.hash);
    },[videoReady]);

    const selectTrailer = () => {
        setShowTrailer(true);
    }

    const tryGetMovieTrailer = () => {
        getMovieTrailer(movieId, "en-US").then(res => {
            if (!res.results) throw new Error("Content not found");
            var trailer = res.results.find(v => v.site == "YouTube");
            var url = trailer ? `https://youtube.com/watch?v=${trailer.key}` : "";
            setTrailerUrl(url)
        })
        .catch(err => console.log(err));
    }

    const tryGetCompleteMovieData = () => {
        getMovieCompleteData(movieId).then(res => {
            if (!res.data.movies) throw new Error("Content not found");
            const fetchedMovie = getMovieDto(res.data.movies[0]);
            setMovie(fetchedMovie);
            moviesRepository.saveMovie(fetchedMovie);
        })
        .catch(err => console.log(err));
    }
    useEffect(() => {
        try {
            var newMovie = moviesRepository.getMovie(movieId) || false;

            tryGetMovieTrailer();

            if (!newMovie) tryGetCompleteMovieData();
            else setMovie(newMovie);
            getSubtitles(newMovie.imdbCode).then(setupSubtitles); 
        } catch (error) {
            console.log(error)
        }
    }, []);

    const setupSubtitles = subs => {
        var aux = [];
        Object.keys(subs).forEach(key => {
            aux = [...aux,
                    ...subs[key].sort((a,b) => parseFloat(b.score) - parseFloat(a.score)).slice(0,5)
                ];
        });
        setAvailableSubtitles(aux);
    }

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
                selectTrailer={selectTrailer}
            />}
            {!showTrailer && videoUrl && <PlayerView image={movie.image} videoUrl={videoUrl} availableSubtitles={availableSubtitles}/>}
            {showTrailer && trailerUrl && <PlayerView videoUrl={trailerUrl}/>}
        </div>
    )
};

export default MovieDetail;