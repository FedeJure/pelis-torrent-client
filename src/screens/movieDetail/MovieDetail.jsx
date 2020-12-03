import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import moviesRepository from '../../repositories/moviesRepository';
import Header from '../../components/header/Header';
import PlayerView from "../../components/player/PlayerView";
import { getMovieCompleteData, getMovieTrailer, getMovieSubtitles, searchMovie, getMovieExternalIds } from "../../services/api";
import { getMovieFromMagnet } from '../../WebtorrentClient/WebtorrentClient';
import { getMovieDtoFromYts } from "../../domain/movie";
import ContentDescription from "../../components/contentDescription/ContentDescription"
import BackgroundImage from "../../components/backgroundImage/BackgroundImage";
import { mapToSubtitlesList } from "../../services/subtitlesService";
import SourceSelector from "../../components/sourceSelector/SourceSelector";

import "./MovieDetail.css"

const getYtsSources = movie => {
    return movie.torrents.map(t => ({
        title: `${movie.title} [YTS.MX] ${t.quality}`,
        magnet: t.hash
    }));
}

const MovieDetail = () => {
    const [movie, setMovie] = useState(null);
    const [selectedTorrents, setSelectedTorrents] = useState({});
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoReady, setVideoReady] = useState({hash: '', url: ''});
    const [showTrailer, setShowTrailer] = useState(true);
    const [availableSubtitles, setAvailableSubtitles] = useState([]);
    const [sources, setSources] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        try {
            var newMovie = moviesRepository.getMovie(movieId) || false;

            tryGetMovieTrailer();

            if (!newMovie) tryGetCompleteMovieData();
            else setMovie(newMovie);
            getMovieSubtitles(newMovie.imdbCode).then(setupSubtitles); 
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        const torrents = {...selectedTorrents};
        
        if (!torrents[videoReady.hash]) return;
        torrents[videoReady.hash].url = videoReady.url;
        torrents[videoReady.hash].ready = true;
        setSelectedTorrents(torrents);
        setTorrentReady(videoReady.hash);
    },[videoReady]);

    useEffect(() => {
        if (!movie) return;
        searchMovie(movie.id, movie.title, response => {
            if (response.torrents.length > 0) {
                setSources([...getYtsSources(movie), ...response.torrents.slice(0,10)]);
            }
        })
    }, [movie])


    const onSourceSelect = source => {
        setShowTrailer(false);
        setVideoUrl("")
        getMovieFromMagnet(source.magnet)
            .then(response => {
                setVideoUrl(response.videoUrl)
                setVideoReady({hash: source.magnet, url: response.videoUrl})
            })
    }

    const setTorrentReady = hash => {
        const updatedMovie = {...movie};
        updatedMovie.torrents = updatedMovie.torrents.map(t => t.hash == hash ? {...t, ready: true} : t);
        setMovie(updatedMovie);
    };

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
        getMovieExternalIds(movieId)
        .then(externalIds => getMovieCompleteData(externalIds.imdb_id))
        .then(res => {
            if (!res.data.movies) throw new Error("Content not found");
            const fetchedMovie = getMovieDtoFromYts(res.data.movies[0]);
            setMovie(fetchedMovie);
            moviesRepository.saveMovie(fetchedMovie);
        })
        .catch(err => console.log(err));
    }

    const setupSubtitles = subs => {
        setAvailableSubtitles(mapToSubtitlesList(subs));
    }

    return (
        <div className="movieDetail commonPage">
            <Header isSerie={false} elements={[Header.TypeSelector, Header.SearchBar, Header.LanguageSelector]}/>
            {movie && movie.backgroundImage && <BackgroundImage image={movie.backgroundImage}/> }
            {movie &&
            <><ContentDescription title={movie.title} details={movie.details} image={movie.image}/></>}
            {trailerUrl && <PlayerView videoUrl={trailerUrl} external/>}
            {movie && <SourceSelector sources={sources} onSelect={onSourceSelect}/>}
            {movie && !showTrailer && <PlayerView videoUrl={videoUrl} readySubtitles={availableSubtitles}/>}
            
        </div>
    )
};

export default MovieDetail;