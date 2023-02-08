const db = require("../connection");

const getPlaylistsById = (id) => {
  return db
    .query(
      `SELECT videos.playlist_id, playlists.name as playlist_name, playlists.description as playlist_desc, videos.yt_video_key as video_key, videos.title as video_title
    FROM playlists
    JOIN videos ON videos.playlist_id = playlists.id
    WHERE playlists.user_id = $1;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getPlaylistsById };
