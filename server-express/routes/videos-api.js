const express = require("express");
const router = express.Router();
const videoQueries = require("../db/queries/videos");

// Delete video by key
router.delete("/:key", (req, res) => {
  const key = req.params.key;
  videoQueries
    .deleteVideoByKey(key)
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
