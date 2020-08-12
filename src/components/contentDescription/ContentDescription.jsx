import React from 'react';
import "./ContentDescription.css"

const ContentDescription = ({title,details,image}) => (
    <div className="contentDescription">
        <div className="header-details">
            <span><img src={image} align="left" /><h3>{title}</h3>{details}</span>
        </div>
    </div>
);

export default ContentDescription;