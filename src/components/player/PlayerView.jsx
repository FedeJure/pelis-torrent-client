import React, { useEffect, useState } from "react";
import { getTorrentUrl } from '../../WebtorrentClient/WebtorrentClient';
import ReactPlayer from 'react-player'

import "./PlayerView.css";
const PlayerView = ({ torrent, video, trailerUrl }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (torrent.hash)
      getTorrentUrl(torrent.hash)
        .then(url => ReactPlayer.canPlay(url) && setVideoUrl(url))
        .catch(error => console.error(error));
  }, [torrent]);

  return (<div className="playerView">
        <ReactPlayer url={videoUrl ? videoUrl : trailerUrl}
        className='react-player'
        controls
        width='100%'
        height='100%'
        light={video ? video.image : true}
        />
    </div>);
};

export default PlayerView;
