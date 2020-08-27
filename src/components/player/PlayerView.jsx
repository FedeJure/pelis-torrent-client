import React, { useEffect } from "react";
import Plyr from 'plyr';
import LoadingBanner from "../loadingBanner/LoadingBanner";

import "./PlayerView.css";
import { read } from "fs";
const PlayerView = ({ image, videoUrl, readySubtitles }) => {

  var playerToRender = <LoadingBanner />;
  if (videoUrl && videoUrl.length > 0 && !readySubtitles) 
    playerToRender = <video crossOrigin="anonymous" id="player" playsInline controls>
                        <source crossOrigin="anonymous" src={videoUrl} type="video/mp4"/>
                      </video>
  if (videoUrl && videoUrl.length > 0 && readySubtitles)
    playerToRender = <video crossOrigin="anonymous" id="player" playsInline controls>
                      <source crossOrigin="anonymous" src={videoUrl} type="video/mp4"/>
                      {readySubtitles && readySubtitles.map(sub => (
                        <track key={sub.src} {...sub}/>
                      ))}
                    </video>

  return (
      <div className="playerContainer">
          {new Plyr('#player') && playerToRender}
      </div>
  );
}

export default PlayerView;
