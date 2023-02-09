import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Playlist(props) {
  // const [thumbnail, setThumbnail] = useState(null);

  const arrayOfVideos = props.videos;

  // Map through the array of videos and return a li with the video title
  const allTheVideos = arrayOfVideos.map((video) => {
    // console.log("video: ", video);
    // fetch(`https://invidious.sethforprivacy.com/api/v1/videos/MWQkvbe5nyY`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("gotten from api: ", data);
    //     setThumbnail(data.videoThumbnails[1].url);
    //   });

    const thumbnail = `https://inv.riverside.rocks/vi/${Object.keys(video)}/default.jpg`

    return (
      <Link to={`/video/${Object.keys(video)}`} key={Object.keys(video)}>
        <li>
          <img src={thumbnail} />
          {Object.values(video)}
        </li>
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
