import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
import { useGlobalContext } from "context/context";

import "./Playlist.css";

export default function Playlist(props) {
  const arrayOfVideos = props.videos;

  console.log("PLProps", props);

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

  const { setUpdatePL, setDeleteVid, deleteVid } = useGlobalContext();

  useEffect(() => {
    axios
      .delete(`/api/videos/delete/`, { data: { key: deleteVid } })
      .then((res) => {
        console.log("delete response:", res.status);
        setUpdatePL(deleteVid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteVid]);

  const deleteVideo = (key) => {
    setDeleteVid(key);
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
