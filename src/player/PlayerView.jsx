import React, { useEffect } from "react";
import "./PlayerView.css";

const PlayerView = ({ torrentId, image }) => {
  const container = <div id="player" className="PlayerView"></div>;

  useEffect(() => {
    const playerOptions = {
      id: "player",
      magnet: torrentId,
      on: function(e) {
        if (e.name === window.webtor.TORRENT_FETCHED) {
          console.log("Torrent fetched!");
        }
        if (e.name === window.webtor.TORRENT_ERROR) {
          console.log("Torrent error!");
        }
      },
      poster: image
    };

    document.getElementById("player").childNodes.forEach(node => {
      if (node.id.includes("webtor")) node.parentNode.removeChild(node);
    });
    window.webtor.push(playerOptions);
  });

  return container;
};

export default PlayerView;
