const express = require("express");
const router = express.Router();
const playlistQueries = require("../db/queries/playlists");
const { addToPlaylist } = require("../db/queries/addToPlaylist");
const { createPlaylist } = require("../db/queries/createPlaylist");

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

router.post("/", (req, res) => {
  console.log("body two====+++++", req.body)
  const name = req.body.playlistName
  const description = req.body.playlistDesc
  const user_id = req.body.userid
  createPlaylist(name, description, user_id)
    .then((data) => {
      console.log("new pl data====", data)
      return res.send(data)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
})

module.exports = router;
