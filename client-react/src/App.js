import axios from "axios";
import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "context/context";

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
    setUsername,
    setUserid,
    setPlaylists,
    // Used to update playlist sidebar on add video
    updatePL,
  } = useGlobalContext();

  // Change user: 1=BigJim48, 2=LabberLearner23, 3=iHEARTreact
  const loggedInUser = 3;
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
    // eslint-disable-next-line
  }, []);

  // get playlists for logged in user
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
    // eslint-disable-next-line
  }, [updatePL]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
        </Routes>
      </Router>
    </div>
  );
}
