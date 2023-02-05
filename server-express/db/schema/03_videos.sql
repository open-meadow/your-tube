DROP TABLE IF EXISTS videos CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  video_key VARCHAR(11) NOT NULL,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE
);