import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";

import "./Playlist.css";

export default function Playlist(props) {
  const arrayOfVideos = props.videos;

  console.log(props);

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

  const deleteVideo = (key) => {
    console.log(`I'm gonna delete video ${key}`);
  };

  // Map through the array of videos and return a li with the video title
  const allTheVideos = arrayOfVideos.map((video) => {
    const thumbnail = `https://inv.riverside.rocks/vi/${Object.keys(
      video
    )}/default.jpg`;

    return (
      <div className="playlist-item">
        <Link to={`/video/${Object.keys(video)}`} key={Object.keys(video)}>
          <img src={thumbnail} />
        </Link>
        <div className="title">{Object.values(video)}</div>

        <CloseButton onClick={() => deleteVideo(Object.keys(video))} />
      </div>
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
