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
    <div className="Video-Page">
      <Navigation />
      <hr className="break-line"></hr>
      <div className="video">
        {loadingState && (
          <Spinner
            className="loading-spin"
            animation="border"
            variant="light"
            role="status"
          />
        )}
        {!loadingState && <VideoPlayer />}
      </div>
    </div>
  );
}
