import React, { useEffect, useState } from "react";
import { getTorrentUrl } from '../WebtorrentClient/WebtorrentClient';
import ReactPlayer from 'react-player'

import "./PlayerView.css";
const PlayerView = ({ torrentId, image }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    getTorrentUrl(torrentId)
      .then(url => console.log(url) || setVideoUrl(url))
      .catch(error => console.error(error));
  }, []);

  return videoUrl && 
    <div>
      <ReactPlayer url={videoUrl}
      className='react-player'
      playing
      controls
      width='100%'
      height='100%' />
    </div>;
};

export default PlayerView;
