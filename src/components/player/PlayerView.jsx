import React, { useEffect, useState } from "react";
import { getTorrentUrl } from '../../WebtorrentClient/WebtorrentClient';
import ReactPlayer from 'react-player'

import "./PlayerView.css";
const PlayerView = ({ torrent, video }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    getTorrentUrl(torrent.hash)
      .then(url => setVideoUrl(url))
      .catch(error => console.error(error));
  }, []);

  return (<div className="playerView">
        <ReactPlayer url={videoUrl}
        className='react-player'
        controls
        width='100%'
        height='100%'
        light={video ? video.image : true}
        />
    </div>);
};

export default PlayerView;
