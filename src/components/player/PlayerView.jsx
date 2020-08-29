import React, { useEffect, useState } from "react";
import Plyr from 'plyr';
import ReactPlayer from 'react-player'
import LoadingBanner from "../loadingBanner/LoadingBanner";

import "./PlayerView.css";

const PlayerView = ({ videoUrl, readySubtitles, loading, external }) => {

  useEffect(() => {
    new Plyr("#video");
  }, [videoUrl]);

  return (
      <div className="playerContainer">
        {!videoUrl && <LoadingBanner />}
        {videoUrl && !external && <div className="internalContainer">
          <video id="video" crossOrigin="anonymous" playsInline controls>
              <source crossOrigin="anonymous" src={videoUrl} type="video/mp4"/>
              {readySubtitles && readySubtitles.map(sub => (
                <track key={sub.src} {...sub}/>
              ))}
          </video>
        </div>}
        {videoUrl && external && <ReactPlayer 
          url={videoUrl}
          controls
          width='100%'
          height='100%'
          config={{ file: {
              attributes: {
                crossOrigin: "anonymous"
              }
            }}}>
        </ReactPlayer>}

      </div>
  );
};

export default PlayerView;
