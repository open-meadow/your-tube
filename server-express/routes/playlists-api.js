const express = require("express");
const router = express.Router();
const playlistQueries = require("../db/queries/playlists");

router.get("/", (req, res) => {
  playlistQueries
    .getPlaylists()
    .then((playlists) => {
      res.json({ playlists });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
