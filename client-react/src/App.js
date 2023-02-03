import "App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

export default function App() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios
      .get("/api/status")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus({ error: err.message });
      });
  }, []);

  const opts = {
    playerVars: {
      rel: 0,
    },
  };

  const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  const videoId = "MWQkvbe5nyY";

  const getVideoSource = async function (videoId) {
    const response = await fetch(invidiousEndpoint + videoId);
    console.log("response: ", response);
    const data = await response.json();
    return data.files[0].url;
  };

  const VideoPlayer = ({ videoId }) => {
    const [source, setSource] = useState("");

    useEffect(() => {
      getVideoSource(videoId).then((source) => {
        setSource(source);
      });
    }, [videoId]);

    return <video controls={true} src={source} style={{ width: "100%" }} />;
  };

  return (
    <div className="App">
      <h1>Hello React World</h1>
      <YouTube videoId="MWQkvbe5nyY" opts={opts} />

      <VideoPlayer videoId={videoId} />

      <iframe
        src="https://www.youtube.com/embed/hy9Cbp_yV5Y?rel=0"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>

      <video></video>

      <section>
        {!status.error && (
          <>
            API Version: <code>{status.version}</code>
          </>
        )}
        {status.error && (
          <>
            API Error: <code>{status.error}</code>
          </>
        )}
      </section>
    </div>
  );
}
