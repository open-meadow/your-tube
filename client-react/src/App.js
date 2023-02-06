import "App.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import YouTube from "react-youtube";

// Bootstrap Imports ///////////////////////////////

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

////////////////////////////////////////////////////

// Import components
import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import Footer from "components/Footer";

// const youtubesearchapi = require("youtube-search-api");

export default function App() {
  const [status, setStatus] = useState({});

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

  // const API_KEY = "AIzaSyBZ9Mr5A7JlJO2sqYsG09v1UR1TCKtkRk8";
  const searchTerm = "pitch meeting";

  fetch(`https://invidious.sethforprivacy.com/api/v1/search?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  // fetch(
  //   `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&type=video&key=${API_KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));

  // youtubesearchapi
  //   .GetListByKeyword("pitch+meeting")
  //   .then((data) => console.log("this is data: ", data))
  //   .catch((err) => console.error("this is err: ", err));

  return (
    <div className="App">
      <Navigation />
      <hr className="break-line"></hr>
      <MainContent />
      <Footer />

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
    </div>
  );
}
