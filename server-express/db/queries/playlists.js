const db = require("../connection");

const getPlaylistsById = (id) => {
  return db
    .query(
      `SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, playlists.description AS playlist_desc,
      COALESCE(json_agg(json_build_object(COALESCE(videos.yt_video_key, ''), COALESCE(videos.title, ''))), '[]') AS videos
      FROM playlists
      LEFT JOIN videos ON videos.playlist_id = playlists.id
      WHERE playlists.user_id = $1
      GROUP BY playlists.id, playlists.name, playlists.description;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getPlaylistsById };
