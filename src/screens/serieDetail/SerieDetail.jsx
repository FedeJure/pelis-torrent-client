import React, {useEffect, useState} from 'react';
import { findBestMatch } from 'string-similarity';
import { useParams } from "react-router-dom";
import { getSerieData, searchSerie, getSerieAlternativeNames } from "../../services/api"
import {getSerieDto} from "../../domain/serie";
import BackgroundImage from "../../components/backgroundImage/BackgroundImage";
import EpisodeSelector from "../../components/episodeSelector/EpisodeSelector";
import ContentDescription from "../../components/contentDescription/ContentDescription";
import PlayerView from "../../components/player/PlayerView";
import { getEpisodeFromPack } from "../../WebtorrentClient/WebtorrentClient";



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
    const { serieId } = useParams();
    const [serie, setSerie] = useState(null);
    const [episodeMagnet, setEpisodeMagnet] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [alternativeNames, setAlternativeNames] = useState([]);

    const onSelectEpisode = (season, episode) => {
        searchSerie(serieId, serie.title, season, episode, response => {
            if (response.torrents.completeSeason.length > 0) {
                console.log(response.torrents)
                const bestTorrentChoise = selectBestChoise([serie.title, ...alternativeNames] , season, response.torrents.completeSeason);
                console.log(bestTorrentChoise)
                setEpisodeMagnet(bestTorrentChoise.magnet);
                getEpisodeFromPack(bestTorrentChoise.magnet, episode)
                    .then(url => {
                        console.log("setting video url:" ,url)
                        setVideoUrl(url)
                    })
                    .catch(err => console.error(err));
            }
        })
    }

    useEffect(() => {
        getSerieData(serieId, response => {
            setSerie(getSerieDto(response));
        })
        getSerieAlternativeNames(serieId).then(res => setAlternativeNames(res.map(unescape)))
    }, []);
    
    return (<div className="serieDetail commonPage">
        <Header isSerie={true}/>
        {serie && serie.backgroundImage && <BackgroundImage image={serie.backgroundImage}/> }
        {serie && <>
            <ContentDescription title={serie.title} details={serie.details} image={serie.image}/>
            {episodeMagnet && <PlayerView image={serie.image} videoUrl={videoUrl}/>}
            <EpisodeSelector seasons={serie.seasons} onSelectEpisode={onSelectEpisode}/>
        </>}
    </div>);
}

export default SerieDetailScreen;