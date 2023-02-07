import axios from "axios";
import { React, useEffect, useState } from "react";
import YouTube from "react-youtube";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// CSS Imports ///////////////////////////////

import "bootstrap/dist/css/bootstrap.min.css";
import "App.css";
import "Results.css";

////////////////////////////////////////////////////

// Import components
import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import Footer from "components/Footer";
import SearchResult from "components/SearchResult";
import useApplicationData from "hooks/useApplicationData";

export default function App() {
  const [status, setStatus] = useState({});
  const [username, setUsername] = useState();
  const [userid, setUserid] = useState();
  const [playlists, setPlaylists] = useState([]);

  const {
    searchData,
    setSearchData,
    searchTerm,
    setSearchTerm,
    getSearchData,
  } = useApplicationData();

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

  // Change user: 1=BigJim48, 2=LabberLearner23, 3=iHEARTreact
  const loggedInUser = 1;

  useEffect(() => {
    axios
      .get(`/api/users/${loggedInUser}`)
      .then((res) => {
        // Set 'user' states
        setUsername(res.data.user[0].username);
        setUserid(res.data.user[0].id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/playlists/${loggedInUser}`)
      .then((res) => {
        // Set 'user' states
        console.log("playlist data:", res.data.playlists);
        setPlaylists(res.data.playlists);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log("playlist state:", playlists);

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
  // const searchTerm = "pitch meeting";

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
      <Navigation username={username} playlists={playlists} />
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

      <SearchResult getSearchData={getSearchData} />
    </div>
  );
}
