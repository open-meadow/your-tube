import axios from "axios";
import { React, useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YouTube from "react-youtube";

// CSS Imports ///////////////////////////////

import "bootstrap/dist/css/bootstrap.min.css";
import "App.css";
import "Results.css";

////////////////////////////////////////////////////

// Import pages
import Home from "pages/Home";
import Video from "pages/Video";

export default function App() {
  const [status, setStatus] = useState({});
  const [username, setUsername] = useState();
  const [userid, setUserid] = useState();
  const [playlists, setPlaylists] = useState([]);

  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    setSearchData([]);
    setLoadingState(true);

    fetch(`https://invidious.sethforprivacy.com/api/v1/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("this is data: ", data);
        setSearchData(data);
        setLoadingState(false);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      });
  }, [searchTerm]);

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

  fetch(`https://invidious.sethforprivacy.com/api/v1/search?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                playlists={playlists}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                loadingState={loadingState}
                searchData={searchData}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
              />
            }
          />
          <Route
            path="/video"
            element={<Video username={username} playlists={playlists} />}
          />
        </Routes>
      </Router>

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
