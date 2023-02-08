import React from "react";

export default function Playlist(props) {
  const arrayOfVideos = props.videos;

  // Map through the array of videos and return a li with the video title
  const allTheVideos = arrayOfVideos.map((video) => {
    return <li key={Object.keys(video)}>{Object.values(video)}</li>;
  });

  return (
    <div>
      <h2>{props.playlist_name}</h2>
      <p>{props.playlist_desc}</p>
      <ul>{allTheVideos}</ul>
    </div>
  );
}
