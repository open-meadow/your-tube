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

      <div id="search-results">
        <article className="video">
          
        </article>
      </div>

    </div>
  );
}
