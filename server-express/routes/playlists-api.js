const express = require("express");
const router = express.Router();
const playlistQueries = require("../db/queries/playlists");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  playlistQueries
    .getPlaylistsById(id)
    .then((playlists) => {
      res.json({ playlists });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
