import React from "react";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDesktop } from "@fortawesome/free-solid-svg-icons";

export default function Nav(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  
  let playlistName = props.playlists[0].name;
  
  console.log("props:", props);
  console.log("playlists:", props.playlists)
  console.log("playlist zero:", props.playlists[0].name)

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="home-link" href="/">
        <FontAwesomeIcon icon={faDesktop} />
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
        <Offcanvas.Body>
          <h2>{playlistName}</h2>
          <ul>
            <li>Song 1</li>
            <li>Song 2</li>
            <li>Song 3</li>
            <li>Song 4</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
