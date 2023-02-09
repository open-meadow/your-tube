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
import Playlist from "./Playlist";
import { useGlobalContext } from "context/context";

export default function Nav(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // get username and playlists from global context
  const { username, playlists } = useGlobalContext();
  // made change here to use 'playlists' from global context instead of props.playlists
  const arrayOfPlaylists = playlists;

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
    <Navbar sticky="top" bg="dark" variant="dark">
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
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Playlists</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{allThePlaylists}</Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
