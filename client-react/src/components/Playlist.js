import React from "react";

export default function Playlist(props) {
  console.log("plylst prps:", props);

  return (
    <div>
      <h2>{props.playlist_name}</h2>
      <ul>
        <li>{props.video_title}</li>
        {/* <li>Song 2</li>
        <li>Song 3</li>
        <li>Song 4</li> */}
      </ul>
    </div>
  );
}
