import React from 'react';
import LoadingBanner, {PRIMARY_LIGHT} from "../loadingBanner/LoadingBanner";
import "./SourceSelector.css";

const SourceSelector = ({sources, onSelect}) => (
    <div className="sourceSelector">
      <p className="sourceSelectorTitle">Sources:</p>
        <div className="sourceSelectorContainer">
            {sources.length == 0 && <LoadingBanner color={PRIMARY_LIGHT} opacity={0.2}/>}

            {sources.map((source, i) => (
                <div className="source" key={i} onClick={() => onSelect(source)}>
                    <p>{source.title}</p>
                </div>
            ))}
        </div> 
    </div>
);

export default SourceSelector;