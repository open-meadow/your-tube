const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/userByName");

router.get("/", (req, res) => {
  userQueries
    .getUserByName()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
