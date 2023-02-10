const db = require("../connection");

// Get user by id
const deleteVideoByKey = (key) => {
  return db
    .query(`DELETE FROM videos WHERE yt_video_key = $1::text;`, [key])
    .then((data) => {
      return data;
    });
};

module.exports = { deleteVideoByKey };
