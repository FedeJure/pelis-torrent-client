import React, { useEffect, useState, Children } from "react";
import ReactPlayer from 'react-player'

import "./PlayerView.css";
const PlayerView = ({ image, videoUrl, availableSubtitles, readySubtitles }) => 
      (
      <div className="playerView" crossOrigin="anonymous">
        <ReactPlayer url={videoUrl ? videoUrl : process.env.PUBLIC_URL + "/videoLoading.gif"}
        className='react-player'
        controls
        width='100%'
        height='100%'
        light={image ? image : true}
        config={{ file: {
            attributes: {
              crossOrigin: "anonymous"
            },
            tracks: readySubtitles ? readySubtitles : []
          }}}
        playing={true}>
        </ReactPlayer>
    </div>
);

export default PlayerView;
