import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { getSerieData, searchSerie } from "../../services/api"
import {getSerieDto} from "../../domain/serie";
import BackgroundImage from "../../components/backgroundImage/BackgroundImage";
import EpisodeSelector from "../../components/episodeSelector/EpisodeSelector";
import ContentDescription from "../../components/contentDescription/ContentDescription";
import PlayerView from "../../components/player/PlayerView";
import { getEpisodeFromPack } from "../../WebtorrentClient/WebtorrentClient";



import Header from '../../components/header/Header';

import "./SerieDetail.css";

const SerieDetailScreen = () => {
    const { serieId } = useParams();
    const [serie, setSerie] = useState(null);
    const [episodeMagnet, setEpisodeMagnet] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    const onSelectEpisode = (season, episode) => {
        searchSerie(serieId, season, episode, response => {
            if (response.torrents.completeSeason.length > 0) {
                setEpisodeMagnet(response.torrents.completeSeason[0].magnet);
                getEpisodeFromPack(response.torrents.completeSeason[0].magnet, episode)
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