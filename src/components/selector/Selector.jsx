import React, { useState } from "react";
import "./Selector.css";
var selected = 0;
const Selector = ({ torrents, setTorrent, selectTrailer, trailer }) => {
  const setSelected = value => selected = value;

  const selectTorrent = (torrent, index) => {
    if (torrent.ready) setSelected(index+1);
    setTorrent(torrent);
  };

  return (
    <div className="movie-selector">
      <div className="options">
        {trailer && <button key="trailer-button" onClick={() => setSelected(0) || selectTrailer()} className={`ready ${selected == 0 ? "active" : ""}`}>
          <span className="text">Trailer</span>
        </button>}
        {torrents.map((torrent, index) => (
          <button key={torrent.hash} className={`${selected == index+1 && torrent.ready ? "active" : ""} ${torrent.ready ? "ready" : torrent.loading ? "loading" : "pending"}`} onClick={() =>selectTorrent(torrent, index)}>
            <span className="text">{torrent.loading && !torrent.ready && <img src={process.env.PUBLIC_URL + "/loading.gif"}/> }{torrent.quality}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Selector;
