import React from "react";
import "./Selector.css";

const Selector = ({ torrents, setTorrent, image, title, details, selectTrailer }) => {
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
        <button key="trailer-button" onClick={selectTrailer} className="ready">
          <span className="text">Trailer</span>
        </button>
        {torrents.map(torrent => (
          <button key={torrent.hash} className={torrent.ready ? "ready" : torrent.loading ? "loading" : "pending"} onClick={() =>setTorrent(torrent)}>
            <span className="text">{torrent.quality}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Selector;
