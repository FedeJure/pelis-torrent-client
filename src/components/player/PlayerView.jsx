import React, { useEffect, useState, Children } from "react";
import { getTorrentUrl } from '../../WebtorrentClient/WebtorrentClient';
import ReactPlayer from 'react-player'

import "./PlayerView.css";
const PlayerView = ({ image, videoUrl, availableSubtitles }) => 
      (
      <div className="playerView" crossOrigin="anonymous">
        <ReactPlayer url={videoUrl}
        className='react-player'
        controls
        width='100%'
        height='100%'
        light={image ? image : true}
        config={{ file: {
            attributes: {
              crossOrigin: "anonymous"
            },
            tracks:
             availableSubtitles && availableSubtitles.map(sub => ({kind: 'subtitles', src: sub.url, srcLang: sub.languageName, default: true, crossOrigin:"anonymous"}))
          }}}>
        </ReactPlayer>
    </div>
);

export default PlayerView;
