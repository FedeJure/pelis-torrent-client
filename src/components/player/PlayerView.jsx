import React, { useEffect, useState } from "react";
import { getTorrentUrl } from '../../WebtorrentClient/WebtorrentClient';
import ReactPlayer from 'react-player'

import "./PlayerView.css";
const PlayerView = ({ image, videoUrl }) => 
      (<div className="playerView">
        <ReactPlayer url={videoUrl}
        className='react-player'
        controls
        width='100%'
        height='100%'
        light={image ? image : true}
        />
    </div>
);

export default PlayerView;
