const express = require("express");
const router = express.Router();
const videoQueries = require("../db/queries/videos");

// Delete video by key
router.delete("/delete/", (req, res) => {
  const key = req.body.key[0];
  // console.log(key);
  videoQueries
    .deleteVideoByKey(key)
    .then(() => {
      res.json();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
