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
import { mapToSubtitlesList } from "../../services/subtitlesService";
import NextEpisodeSelector from "../../components/nextEpisodeSelector/NextEpisodeSelector";
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
        setVideoUrl("")
        Promise.all([getEpisodeFromPack(source.magnet, episode),
            getSerieSubtitles(serieId, season, episode)])
            .then(res => {
                setVideoUrl(res[0].videoUrl);
                const subs = mapToSubtitlesList(res[1]);
                setAvailableSubtitles(subs);
            });
    }

    const onSelectEpisode = (selectedSeason, selectedEpisode) => {
        history.push(Routes.getSerieUrl(serieId, selectedSeason, selectedEpisode));
        if (!serie || !serie.title) return;
        setSources([])
        searchSerie(serieId, serie.title, selectedSeason, selectedEpisode, response => {
            if (response.torrents.completeSeason.length > 0) {
                setSources([...response.torrents.completeSeason.slice(0,10), ...response.torrents.episode.slice(0,10)]);
                // const bestTorrentChoise = selectBestChoise([serie.title, ...alternativeNames] , selectedSeason, response.torrents.completeSeason);
            }
        })
        window.scrollTo(0,0)
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

    useEffect(() => {
    }, [availableSubtitles, videoUrl]);

    
    return (<div className="serieDetail commonPage">
        <Header isSerie={true} elements={[Header.TypeSelector, Header.SearchBar, Header.LanguageSelector]}/>
        {serie && serie.backgroundImage && <BackgroundImage image={serie.backgroundImage}/> }
        {serie && <>
            <ContentDescription title={serie.title} details={serie.details} image={serie.image}/>
            {episode && <p className="episodeTitle">{`${serie.title} | Season: ${season} - Episode: ${episode}`}</p>}
            {season && episode && <SourceSelector  sources={sources} onSelect={onSourceSelect}/>}
            {episodeMagnet && <PlayerView title={`${serie.title} | Season: ${season} - Episode: ${episode}`} videoUrl={videoUrl} readySubtitles={availableSubtitles}/>}
            {serie.seasons && episode && season && <NextEpisodeSelector seasons={serie.seasons} actualEpisode={episode} actualSeason={season} serieId={serieId}/>}
             <p className="episodeTitle">{`Episodes:`}</p>       
            <EpisodeSelector seasons={serie.seasons} onSelectEpisode={onSelectEpisode}/>
        </>}
    </div>);
}

export default SerieDetailScreen;