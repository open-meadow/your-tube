const db = require("../connection");

const createPlaylist = (name, desc, userId) => {
  return db
    .query(`
    INSERT INTO playlists (name, description, user_id)
    VALUES ($1, $2, $3) 
    RETURNING *;
    `, [name, desc, userId])
    .then((data) => {
      return data.rows[0]
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

module.exports = { createPlaylist }