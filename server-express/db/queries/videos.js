const db = require("../connection");

// Get user by id
const deleteVideoByKey = (key) => {
  return db
    .query(
      `SELECT *
        FROM videos 
        WHERE yt_video_key = $1;`,
      [key]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { deleteVideoByKey };
