import React from "react";
import "./EpisodeSelector.css";

const EpisodeSelector = ({seasons}) => {
    return (
    <div className="episodeSelector">
        {seasons.reverse().map(season => (<EpisodeSelectorOnSeason season={season}/>))}
    </div>);
};

const EpisodeSelectorOnSeason = ({season}) => (
    <div className="episodeSelectorOnSeason">
        <p>{`Season: ${season.season}`}</p>
    </div>);

export default EpisodeSelector;