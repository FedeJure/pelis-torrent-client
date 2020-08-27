import React from 'react';
import "./LoadingBanner.css";

const PRIMARY_LIGHT = "#1D2738"

const LoadingBanner = ({color="#1D2738", opacity="1"}) => (
    <div className="loadingBanner" style={{backgroundColor: color, filter:`opacity(${opacity})`}}>
        <img src={process.env.PUBLIC_URL + "/loading.svg"} alt="loading"/>
    </div>
);

export default LoadingBanner;
export { PRIMARY_LIGHT };