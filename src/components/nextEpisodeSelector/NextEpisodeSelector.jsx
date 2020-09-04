import React from 'react'
import "./NextEpisodeSelector.css";

const previous = (a) => (a - 1);
const next = (a) => (a + 1);

const getEpisode = (actualSeason, actualEpisode, seasons, operation, onNext) => {
    const actual = seasons[actualSeason];
    if (!actual[operation(actualEpisode)]) {
        const otherSeason = seasons[operation(actualSeason)];
        if (!otherSeason) return null;
        return { season: operation(actualSeason), episode: otherSeason[onNext(...Object.keys(otherSeason).map(i => parseInt(i)))]};
    }
    return { season: actualSeason, episode: operation(actualEpisode)};
}
const toSeasonsObject = data => {
    const response = {};
    Object.keys(data).forEach(key => {
        const element = data[key];
        const season = element.season;
        const episodes = element.episodes;
        response[season] = {};
        for (let i = 1; i <= episodes; i++) {
            response[season][i] = i;
        }
    });
    return response;

};

const NextEpisodeSelector = ({seasons, actualSeason, actualEpisode, serieId}) => {
    const seasonsObject = toSeasonsObject(seasons)
    const nextEpisode = getEpisode(parseInt(actualSeason), parseInt(actualEpisode), seasonsObject, next, Math.min);
    const previousEpisode = getEpisode(parseInt(actualSeason), parseInt(actualEpisode), seasonsObject, previous, Math.max);

    return (
        <div className="nextEpisodeSelector">
            <div className="episodeButton">
                {previousEpisode && <a href={`${process.env.PUBLIC_URL}/serie/${serieId}/${previousEpisode.season}/${previousEpisode.episode}`}>
                    <img className="left" src={`${process.env.PUBLIC_URL}/arrow.svg`}/> 
                    <span>Previous episode</span>                  
                </a>}
            </div>
            <div className="episodeButton">
                {nextEpisode &&<a href={`${process.env.PUBLIC_URL}/serie/${serieId}/${nextEpisode.season}/${nextEpisode.episode}`}>
                    <span>Next episode</span>
                    <img className="right" src={`${process.env.PUBLIC_URL}/arrow.svg`}/>  
                </a>}
            </div>
        </div>);
    
};

export default NextEpisodeSelector;