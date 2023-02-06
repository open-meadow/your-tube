const db = require("../connection");

const getPlaylists = () => {
  return db.query("SELECT * FROM playlists;").then((data) => {
    return data.rows;
  });
};

module.exports = { getPlaylists };
