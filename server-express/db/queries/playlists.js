const db = require("../connection");

const getPlaylistsById = (id) => {
  return db
    .query(
      `SELECT videos.playlist_id, playlists.name AS playlist_name, playlists.description AS playlist_desc, json_agg(json_build_object(videos.yt_video_key, videos.title)) AS videos
      FROM playlists
      JOIN videos ON videos.playlist_id = playlists.id
      WHERE playlists.user_id = $1
      GROUP BY videos.playlist_id, playlists.name, playlists.description`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getPlaylistsById };
