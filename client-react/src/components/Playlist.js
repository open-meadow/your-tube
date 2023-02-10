// Import React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// React Bootstrap
import Button from "react-bootstrap/Button";

// Other Impots
import "./Playlist.css";
import axios from "axios";
import { useGlobalContext } from "context/context";




export default function Playlist(props) {
  const arrayOfVideos = props.videos;

  const { setUpdatePL } = useGlobalContext();

  // console.log(props);

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
  const allTheVideos = arrayOfVideos.map((video) => {
    const thumbnail = `https://inv.riverside.rocks/vi/${Object.keys(
      video
    )}/default.jpg`;

    return (
      <Link to={`/video/${Object.keys(video)}`} key={Object.keys(video)}>
        <div className="playlist-item">
          <img src={thumbnail} />
          <div className="title">{Object.values(video)}</div>
        </div>
      </Link>
    );
  });

  const deletePlaylist = (name, description) => {

    // console.log(props)

    axios
      .put(`/api/playlists`, {name, description})
      .then((res) => {
        // console.log(res);
        setUpdatePL(name);
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  };

  return (
    <div>
      <h2>
        {props.playlist_name}
        <Button
          className="delete-playlist-button"
          onClick={() => deletePlaylist(props.playlist_name, props.playlist_desc)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </h2>
      <p>{props.playlist_desc}</p>
      <ul>{allTheVideos}</ul>
    </div>
  );
}
