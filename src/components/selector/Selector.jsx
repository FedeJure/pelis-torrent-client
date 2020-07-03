import React from "react";
import "./Selector.css";

const Selector = ({ torrents, setTorrent, image, title, details }) => {
  return (
    <div className="movie-selector">
      <div className="header">
        <img src={image} />
        <div className="header-details">
          <h5>{title}</h5>
          <span>{details}</span>
        </div>
      </div>
      <div className="options">
        {torrents.map(torrent => (
          <button key={torrent.hash} onClick={() => setTorrent(torrent)}>
            <span className="text">{torrent.quality}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Selector;
