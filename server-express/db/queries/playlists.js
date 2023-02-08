const db = require("../connection");

const getPlaylistsById = (id) => {
  return db
    .query("SELECT * FROM playlists WHERE user_id = $1;", [id])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getPlaylistsById };
