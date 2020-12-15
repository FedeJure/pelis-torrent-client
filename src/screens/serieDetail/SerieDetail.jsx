import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Routes from "../../services/router";
import { getSerieData, searchSerie, getSerieSubtitles } from "../../services/api"
import {getSerieDto} from "../../domain/serie";
import BackgroundImage from "../../components/backgroundImage/BackgroundImage";
import EpisodeSelector from "../../components/episodeSelector/EpisodeSelector";
import ContentDescription from "../../components/contentDescription/ContentDescription";
import PlayerView from "../../components/player/PlayerView";
import { getEpisodeFromPack } from "../../WebtorrentClient/WebtorrentClient";
import SourceSelector from "../../components/sourceSelector/SourceSelector";
import { mapToSubtitlesList } from "../../services/subtitlesService";
import NextEpisodeSelector from "../../components/nextEpisodeSelector/NextEpisodeSelector";
import Header, {HeaderComponents} from '../../components/header/Header';
import "./SerieDetail.css";

const SerieDetailScreen = () => {
    const history = useHistory();
    const { serieId, season, episode } = useParams();
    const [serie, setSerie] = useState(null);
    const [episodeMagnet, setEpisodeMagnet] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
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
        if (!serie || !serie.title) return;
        history.push(Routes.getSerieUrl(serieId, selectedSeason, selectedEpisode, serie.title));        
        setSources([])
        searchSerie(serieId, serie.title, selectedSeason, selectedEpisode, response => {
            if (response.torrents.completeSeason.length > 0) {
                setSources([...response.torrents.completeSeason.slice(0,10), ...response.torrents.episode.slice(0,10)]);
            }
        })
        window.scrollTo(0,0)
    }

    useEffect(() => {
        getSerieData(serieId, response => {
            setSerie(getSerieDto(response));
        })
    }, []);

    useEffect(() => {
        if (season && episode) onSelectEpisode(season, episode);
    }, [serie]);

    useEffect(() => {
    }, [availableSubtitles, videoUrl]);

    
    return (<div className="serieDetail commonPage">
        <Header isSerie={true} elements={[HeaderComponents.TypeSelector, HeaderComponents.SearchBar, HeaderComponents.LanguageSelector]}/>
        {serie && serie.backgroundImage && <BackgroundImage image={serie.backgroundImage}/> }
        {serie && <>
            <ContentDescription title={serie.title} details={serie.details} image={serie.image}/>
            {episode && <p className="episodeTitle">{`${serie.title} | Season: ${season} - Episode: ${episode}`}</p>}
            {season && episode && <SourceSelector  sources={sources} onSelect={onSourceSelect}/>}
            {episodeMagnet && <PlayerView title={`${serie.title} | Season: ${season} - Episode: ${episode}`} videoUrl={videoUrl} readySubtitles={availableSubtitles}/>}
            {serie.seasons && episode && season && <NextEpisodeSelector seasons={serie.seasons} actualEpisode={episode} actualSeason={season} serieId={serieId} title={serie.title}/>}
             <p className="episodeTitle">{`Episodes:`}</p>       
            <EpisodeSelector seasons={serie.seasons} onSelectEpisode={onSelectEpisode}/>
        </>}
    </div>);
}

export default SerieDetailScreen;