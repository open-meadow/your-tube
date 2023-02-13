// Import React
import React from "react";
import { useEffect, useState } from "react";

// React Bootstrap
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDesktop } from "@fortawesome/free-solid-svg-icons";

// Other Imports
import "./Navigation.css";
import Playlist from "./Playlist";
import { useGlobalContext } from "context/context";
import axios from "axios";

export default function Nav(props) {
  const [show, setShow] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const {
    // Used to update playlist sidebar on add video
    setUpdatePL,
  } = useGlobalContext();

  // get username and playlists from global context
  const { username, playlists, userid } = useGlobalContext();
  // made change here to use 'playlists' from global context instead of props.playlists
  const arrayOfPlaylists = playlists;

  const allThePlaylists = arrayOfPlaylists.map((playlist) => {
    // console.log("props:", props.playlists);
    return (
      <Playlist
        key={playlist.playlist_id}
        playlist_id={playlist.playlist_id}
        playlist_name={playlist.playlist_name}
        playlist_desc={playlist.playlist_desc}
        videos={playlist.videos}
      />
    );
  });

  const handleSubmit = (e) => {
    axios
      .post(`/api/playlists`, { playlistName, playlistDesc, userid: 1 })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Navbar sticky="top" variant="dark">
      <Navbar.Brand className="home-link" href="/">
        <FontAwesomeIcon icon={faDesktop} />
        <span id="brand-home-link">YourTube</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end" id="user-name">
        <Navbar.Text>{username}'s Playlists</Navbar.Text>
      </Navbar.Collapse>
      <Button className="open-sidebar" variant="dark" onClick={handleShow}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>{username}'s Playlists</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h3>Create new playlist:</h3>
          <form id="create-new-playlist">
            <input
              placeholder=" Playlist name"
              value={playlistName}
              onChange={(event) => setPlaylistName(event.target.value)}
            ></input>
            <input
              placeholder=" Playlist description"
              value={playlistDesc}
              onChange={(event) => setPlaylistDesc(event.target.value)}
            ></input>
            <Button
              variant="dark"
              type="submit"
              onClick={handleSubmit}
              className="create-playlist-button"
            >
              Create
            </Button>
          </form>

          {allThePlaylists}
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
