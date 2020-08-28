import React, {useEffect, useState} from 'react';
import { findBestMatch } from 'string-similarity';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Routes from "../../services/router";
import { getSerieData, searchSerie, getSerieAlternativeNames, getSerieSubtitles } from "../../services/api"
import {getSerieDto} from "../../domain/serie";
import BackgroundImage from "../../components/backgroundImage/BackgroundImage";
import EpisodeSelector from "../../components/episodeSelector/EpisodeSelector";
import ContentDescription from "../../components/contentDescription/ContentDescription";
import PlayerView from "../../components/player/PlayerView";
import { getEpisodeFromPack } from "../../WebtorrentClient/WebtorrentClient";
import SourceSelector from "../../components/sourceSelector/SourceSelector";



import Header from '../../components/header/Header';

import "./SerieDetail.css";

const purifyName = name => {
    const regex = /[:;'"(){}_,.]/g;
    return name.replace(regex, " ").toLocaleLowerCase();
}

const containsInWord = (wordList, word) => {
    var response = false;
    wordList.forEach(w => {
        if (w.includes(word)) response = true;
    })
    return response;
}

const mapToSubtitleData = sub => {
    return {
        label: sub.lang,
        srcLang: sub.langcode,
        kind: "subtitles",
        src: sub.vtt,
        crossOrigin: "anonymous"
    }
}

const selectBestChoise = (names, season, torrents) => {
    const matches = names.map(name => findBestMatch(name, torrents.map(t => t.title))).sort( (a,b) => b.bestMatch.rating - a.bestMatch.rating)
    return matches[0] ? torrents[matches[0].bestMatchIndex] : torrents[0];
}

const SerieDetailScreen = () => {
    const history = useHistory();
    const { serieId, season, episode } = useParams();
    const [serie, setSerie] = useState(null);
    const [episodeMagnet, setEpisodeMagnet] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [alternativeNames, setAlternativeNames] = useState([]);
    const [sources, setSources] = useState([]);
    const [availableSubtitles, setAvailableSubtitles] = useState([]);

    const onSourceSelect = source => {
        setEpisodeMagnet(source.magnet);
        Promise.all([
            getEpisodeFromPack(source.magnet, episode),
            getSerieSubtitles(serieId, season, episode)
        ])
            .then(res => {
                setVideoUrl(res[0].videoUrl);
                console.log(res[1])
                const subs = Object.keys(res[1]).map(key => mapToSubtitleData(res[1][key]));
                setAvailableSubtitles(subs);
            });
        // getEpisodeFromPack(source.magnet, episode)
        //     .then(episodeObject => {
        //         setVideoUrl(episodeObject.videoUrl)
        //     })
        //     .catch(err => console.error(err) || setVideoUrl(""));
        // getSerieSubtitles(serieId, season, episode)
        //     .then(res => {
        //         const subs = Object.keys(res).map(key => mapToSubtitleData(res[key]));
        //         setAvailableSubtitles([...availableSubtitles, ...subs]);
        //     })
    }

    const onSelectEpisode = (selectedSeason, selectedEpisode) => {
        history.push(Routes.getSerieUrl(serieId, selectedSeason, selectedEpisode));
        if (!serie || !serie.title) return;
        searchSerie(serieId, serie.title, selectedSeason, selectedEpisode, response => {
            if (response.torrents.completeSeason.length > 0) {
                setSources([...response.torrents.completeSeason.slice(0,10), ...response.torrents.episode.slice(0,10)]);
                // const bestTorrentChoise = selectBestChoise([serie.title, ...alternativeNames] , selectedSeason, response.torrents.completeSeason);
            }
        })
    }

    useEffect(() => {
        getSerieData(serieId, response => {
            setSerie(getSerieDto(response));
        })
        getSerieAlternativeNames(serieId).then(res => setAlternativeNames(res.map(unescape)))
    }, []);

    useEffect(() => {
        if (season && episode) onSelectEpisode(season, episode);
    }, [serie]);
    
    return (<div className="serieDetail commonPage">
        <Header isSerie={true}/>
        {serie && serie.backgroundImage && <BackgroundImage image={serie.backgroundImage}/> }
        {serie && <>
            <ContentDescription title={serie.title} details={serie.details} image={serie.image}/>
            {season && episode && <SourceSelector  sources={sources} onSelect={onSourceSelect}/>}
            {episodeMagnet && <PlayerView image={serie.image} videoUrl={videoUrl} readySubtitles={availableSubtitles}/>}
            <EpisodeSelector seasons={serie.seasons} onSelectEpisode={onSelectEpisode}/>
        </>}
    </div>);
}

export default SerieDetailScreen;