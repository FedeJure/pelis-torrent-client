import React, { useEffect, useState } from "react";
import Plyr from 'plyr';
import ReactPlayer from 'react-player'
import LoadingBanner from "../loadingBanner/LoadingBanner";

import "./PlayerView.css";

const PlayerView = ({ videoUrl, readySubtitles, idle, external }) => {

  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (!videoUrl) setCanPlay(false);
    const player = new Plyr("#video");
    player.on('canplay',() => setCanPlay(true));
  }, [videoUrl]);

  return (
      <div className="playerContainer">
        {!external && !canPlay && <LoadingBanner />}
        {videoUrl && !external && <div className="internalContainer mediumCaptionSize" style={{"display": canPlay ? "unset" : "none"}}>
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
