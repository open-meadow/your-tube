const express = require("express");
const router = express.Router();
const playlistQueries = require("../db/queries/playlists");
const { addToPlaylist } = require("../db/queries/addToPlaylist");

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

router.put("/:id", (req, res) => {
  console.log("body====", req.body)
  const plId = req.params.id
  const vidId = req.body.vidId
  const title = req.body.title
  addToPlaylist(vidId, title, plId)
    .then((data) => {
      console.log("data====", data)
      return res.send(data)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
})

module.exports = router;
