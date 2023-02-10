const db = require("../connection");

const deletePlaylist = (name, desc) => {
  return db
    .query(`
    DELETE FROM playlists
    WHERE name = $1
    AND description = $2
    RETURNING *;
    `, [name, desc])
    .then((data) => {
      // console.log("Successful deletion!", data)
      return "Success!"
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

module.exports = { deletePlaylist }