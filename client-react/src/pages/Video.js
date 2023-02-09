// import css
import "./Video.css";
import Spinner from "react-bootstrap/Spinner";

// import components
import Navigation from "components/Navigation";
import VideoPlayer from "components/VideoPlayer";
import { useGlobalContext } from "context/context";

export default function Video(props) {
  const { loadingState } = useGlobalContext();

  return (
    <div className="Video">
      <Navigation />
      <hr className="break-line"></hr>
      {loadingState && (
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loadingState && <VideoPlayer className="video-player" />}
    </div>
  );
}
