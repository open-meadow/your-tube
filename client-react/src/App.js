import "App.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import YouTube from "react-youtube";

// Bootstrap Imports ///////////////////////////////

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

////////////////////////////////////////////////////

export default function App() {
  const [status, setStatus] = useState({});
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get("/api/status")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus({ error: err.message });
      });
  }, []);

  const opts = {
    playerVars: {
      rel: 0,
    },
  };

  const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  const videoId = "MWQkvbe5nyY";

  const getVideoSource = async function (videoId) {
    const response = await fetch(invidiousEndpoint + videoId);
    console.log("response: ", response);
    const data = await response.json();
    return data.files[0].url;
  };

  // Videoplayer (not in use right now)
  const VideoPlayer = ({ videoId }) => {
    const [source, setSource] = useState("");

    useEffect(() => {
      getVideoSource(videoId).then((source) => {
        setSource(source);
      });
    }, [videoId]);

    return <video controls={true} src={source} style={{ width: "100%" }} />;
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="home-link" href="/">
          YourTube
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id="user-name">
          <Navbar.Text>BigJim48s Playlists</Navbar.Text>
        </Navbar.Collapse>
        <Button className="open-sidebar" variant="dark" onClick={handleShow}>
          Playlists
        </Button>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Playlists</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h2>Hello World!</h2>
            <ul>
              <li>Song 1</li>
              <li>Song 2</li>
              <li>Song 3</li>
              <li>Song 4</li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>

      <hr className="break-line"></hr>

      <div className="main-content">
        <div className="main-words">
          <h1 className="welcome-text text-white">Study without distraction</h1>
        </div>

        <div className="get-started">
          <h5 className="welcome-text text-white">
            Get started by adding a video to your study playlist
          </h5>
        </div>

        <div>
          <form>
            <input
              className="search-bar"
              placeholder="Search by URL or keyword"
            ></input>
            <button className="search-bar">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* <div>
        <section>
          {!status.error && (
            <>
              API Version: <code>{status.version}</code>
            </>
          )}
          {status.error && (
            <>
              API Error: <code>{status.error}</code>
            </>
          )}
        </section>
      </div> */}

      <footer id="footer">
        <div class="">
          <h6>LHL Project by KRS</h6>
        </div>
      </footer>
    </div>
  );
}
