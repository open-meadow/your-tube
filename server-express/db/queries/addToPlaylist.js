const db = require("../connection");

const addToPlaylist = (vidId, title, plId) => {
  return db
    .query(`
      INSERT INTO videos (yt_video_key, title, playlist_id)
      VALUES ($1, $2, $3);
    `, [vidId, title, plId])
    .then((data) => {
      return data.rows
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

module.exports = { addToPlaylist }