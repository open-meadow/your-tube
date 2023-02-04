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

  // const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  // const videoId = "MWQkvbe5nyY";
  // const proxyEndpoint = "https://your-lambda-function.com/getVideoSource";

  // const getVideoSource = async function(videoId) {
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //   const invidiousEndpoint = `https://invidio.us/api/v1/videos/${videoId}`;
  //   const targetUrl = proxyUrl + invidiousEndpoint;
  
  //   try {
  //     const response = await fetch(targetUrl);
  //     const data = await response.json();
  //     return data.files[0].url;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  // exports.handler = async (event, context) => {
  //   const videoId = event.queryStringParameters.videoId;
  //   const invidiousEndpoint = `https://invidio.us/api/v1/videos/${videoId}`;

  //   try {
  //     const response = await axios.get(invidiousEndpoint);
  //     return {
  //       statusCode: 200,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         source: response.data.files[0].url,
  //       }),
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: 500,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         error: error.message,
  //       }),
  //     };
  //   }
  // };

  // const VideoPlayer = (props) => {
  //   const [videoUrl, setVideoUrl] = useState(null);
  
  //   useEffect(() => {
  //     const getVideo = async () => {
  //       const videoSource = await getVideoSource(props.videoId);
  //       setVideoUrl(videoSource);
  //     };
  
  //     getVideo();
  //   }, [props.videoId]);
  
  //   return (
  //     <div>
  //       {videoUrl ? <video src={videoUrl} controls /> : <p>Loading...</p>}
  //     </div>
  //   );
  // };

  return (
    <main className="App">
      <nav className="navbar">
        <h1>Hello React World</h1>
      </nav>

      <YouTube videoId="MWQkvbe5nyY" opts={opts} />

      {/* <VideoPlayer videoId="MWQkvbe5nyY" /> */}

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
    </main>
  );
}
