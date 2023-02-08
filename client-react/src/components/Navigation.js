import React from "react";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Playlist from "./Playlist";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Nav(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // console.log("props:", props.playlists);

  const arrayOfPlaylists = props.playlists;

  const allThePlaylists = arrayOfPlaylists.map((playlist) => {
    // console.log("props:", props.playlists);
    return (
      <Playlist
        key={playlist.playlist_id}
        playlist_name={playlist.playlist_name}
        playlist_desc={playlist.playlist_desc}
        videos={playlist.videos}
      />
    );
  });

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="home-link" href="/">
        YourTube
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end" id="user-name">
        <Navbar.Text>{props.username}'s Playlists</Navbar.Text>
      </Navbar.Collapse>
      <Button className="open-sidebar" variant="dark" onClick={handleShow}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Playlists</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{allThePlaylists}</Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
