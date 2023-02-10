import { useGlobalContext } from "context/context";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Playlist.css";

export default function Playlist(props) {
  const { currentPlaylist, setCurrentPlaylist } = useGlobalContext();

  const arrayOfVideos = props.videos;

  // console.log(props);
  // console.log("playlist: ", props.playlist_id);

  const getRidOfBlankObject = (array) => {
    for (let obj of array) {
      // just look at the first item in video array
      if (obj.hasOwnProperty("")) {
        // get rid of it
        array.pop();
      }
    }

    return array;
  };

  getRidOfBlankObject(props.videos);

  // Map through the array of videos and return a li with the video title
  const allTheVideos = arrayOfVideos.map((video, i) => {
    const thumbnail = `https://inv.riverside.rocks/vi/${Object.keys(
      video
    )}/default.jpg`;

    return (
      <Link to={`/video/${Object.keys(video)}?playlistId=${props.playlist_id}&index=${i}`} key={Object.keys(video)}>
        <div className="playlist-item">
          <img src={thumbnail} />
          <div className="title">{Object.values(video)}</div>
        </div>
      </Link>
    );
  });

  return (
    <div>
      <h2>{props.playlist_name}</h2>
      <p>{props.playlist_desc}</p>
      <ul>{allTheVideos}</ul>
    </div>
  );
}
