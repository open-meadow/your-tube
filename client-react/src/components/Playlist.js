import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
import { useGlobalContext } from "context/context";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// React Bootstrap
import Button from "react-bootstrap/Button";

// Other Impots
import "./Playlist.css";

export default function Playlist(props) {
  const {
    currentPlaylist,
    setCurrentPlaylist,
    setUpdatePL,
    setDeleteVid,
    deleteVid,
  } = useGlobalContext();

  const arrayOfVideos = props.videos;

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
  const allTheVideos = arrayOfVideos.map((video, i) => {
    const thumbnail = `https://inv.riverside.rocks/vi/${Object.keys(
      video
    )}/default.jpg`;

    return (
      <div className="playlist-item">
        <Link
          className="item-link"
          to={`/video/${Object.keys(video)}?playlistId=${
            props.playlist_id
          }&index=${i}`}
          key={Object.keys(video)}
        >
          <img src={thumbnail} />
          <h6 className="title">{Object.values(video)}</h6>
        </Link>

        <CloseButton onClick={() => deleteVideo(Object.keys(video))} />
      </div>
    );
  });

  const deletePlaylist = (name, description) => {
    // console.log(props)

    axios
      .put(`/api/playlists`, { name, description })
      .then((res) => {
        // console.log(res);
        setUpdatePL(name);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <div className="playlist-container">
      <h2>
        {props.playlist_name}
        <Button
          className="delete-playlist-button"
          onClick={() =>
            deletePlaylist(props.playlist_name, props.playlist_desc)
          }
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </h2>
      <p>{props.playlist_desc}</p>
      <ul>{allTheVideos}</ul>
    </div>
  );
}
