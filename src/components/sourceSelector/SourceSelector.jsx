import React from 'react';
import "./SourceSelector.css";

const SourceSelector = ({sources, onSelect}) => (
    <div className="sourceSelector">
      <p className="sourceSelectorTitle">Sources:</p>  
        <div className="sourceSelectorContainer">
            {sources.map((source, i) => (
                <div className="source" key={i} onClick={() => onSelect(source)}>
                    <p>{source.title}</p>
                </div>
            ))}
        </div> 
    </div>
);

export default SourceSelector;