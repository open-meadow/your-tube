import axios from "axios";
import { React, useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "context/context";
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
  const {
    status,
    setStatus,
    username,
    setUsername,
    userid,
    setUserid,
    playlists,
    setPlaylists,
    searchData,
    setSearchData,
    searchTerm,
    setSearchTerm,
    loadingState,
    setLoadingState,
    totalPages,
    setTotalPages,
    // Used to update playlist sidebar on add video
    updatePL,
    setUpdatePL,
  } = useGlobalContext();

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
        // Set 'playlist' state
        setPlaylists(res.data.playlists);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [updatePL]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
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
