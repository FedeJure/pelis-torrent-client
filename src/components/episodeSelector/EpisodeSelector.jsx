import React, { useState } from "react";
import { Animate, AnimateGroup }  from 'react-simple-animate';
import "./EpisodeSelector.css";

const EpisodeSelector = ({seasons, onSelectEpisode}) => {
    const [selectedSeason, setSelectedSeason] = useState(null);
    const selectSeason = seasonNumber => {
        setSelectedSeason(seasonNumber == selectedSeason ? null : seasonNumber);
    }
    return (
    <div className="episodeSelector">
        {seasons.map((season) => (<EpisodeSelectorOnSeason 
                                                key={season.season}
                                                season={season}
                                                onSelect={selectSeason}
                                                selected={selectedSeason == season.season}
                                                onSelectEpisode={onSelectEpisode}/>))}
    </div>);
};

const EpisodeSelectorOnSeason = ({season, onSelect, selected, onSelectEpisode}) => (
    <div className={`episodeSelectorOnSeason ${selected && "selected"}`}>
        <div className={`season ${selected && "selected"}`}
        onClick={_ => onSelect(season.season)}><p>{`Season: ${season.season}`}</p></div>
        {selected && <Episodes count={season.episodes} season={season.season} onSelectEpisode={onSelectEpisode}/>}
    </div>);

const Episodes = ({season, count, onSelectEpisode}) => (
    <Animate
        play={true}
        easeType="easeInQuint"
        delay={0.5}
        duration={1}
        start={{ height: '0%' }}
        end={{ height: '100%'}}>
        <div>
        {Array.from({ length: count }).map((_, i) =>
            (<p className="episode" onClick={_ => onSelectEpisode(season, i + 1)}>{`Episode: ${i + 1}`}</p>)
        )}
        </div>

    </Animate>
);

export default EpisodeSelector;