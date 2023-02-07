const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// Get all users
router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get user by name
router.get("/name", (req, res) => {
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
