import Navigation from "components/Navigation";
import VideoPlayer from "components/VideoPlayer";

export default function Video(props) {
  const { username, playlists } = props

  return (
    <div className="App">
      <Navigation username={username} playlists={playlists} />
      <hr className="break-line"></hr>
      <VideoPlayer />
    </div>
  );
}
