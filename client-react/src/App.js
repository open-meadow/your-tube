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

 

  return (
    <div className="App">
      <h1>Hello React World</h1>
      <YouTube
        videoId = "MWQkvbe5nyY"
      />

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
