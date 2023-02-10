const db = require("../connection");

const deletePlaylist = (name, desc) => {
  return db
    .query(`
    DELETE FROM playlists (name, description)
    WHERE name = $1
    AND description = $2
    RETURNING *
    `, [name, desc])
    .then((data) => {
      return data.rows[0]
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

module.exports = { deletePlaylist }