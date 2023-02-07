import axios from "axios";
import { React, useEffect, useState } from "react";
import YouTube from "react-youtube";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// CSS Imports ///////////////////////////////

import "bootstrap/dist/css/bootstrap.min.css";
import "App.css";
import "Results.css";

////////////////////////////////////////////////////

// Import components
import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import Footer from "components/Footer";

export default function App() {
  const [status, setStatus] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("pitch meeting");

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

  useEffect(() => {
    fetch(`https://invidious.sethforprivacy.com/api/v1/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("daat1", data[1]);
        setSearchData(data);
      });
  }, [searchTerm]);

  const getSearchData = () => {
    const obtainedSearchData = searchData.map((single) => {
      console.log("single", single);
      if (single.title) {
        return (
          <div className="video-result">
            <a href="/">
              <div className="preview">
                <img
                  className="video-header"
                  src={
                    single.videoThumbnails && single.videoThumbnails[1].url
                  }
                  alt="header"
                ></img>
                <p className="video-title text-white">{single.title}</p>
                <FontAwesomeIcon
                  className="plus-icon"
                  icon={faPlusCircle}
                  size="3x"
                />
              </div>
            </a>
          </div>
        );
      }
    })

    return obtainedSearchData;
  }

  return (
    <div className="App">
      <Navigation />
      <hr className="break-line"></hr>
      <MainContent />
      <Footer />

      {/* <div>
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
      </div> */}

      <div id="search-results">
        <article className="video-result">
          <a href="/">
            <div className="preview">
              <img
                className="video-header"
                src="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
                alt="header"
              ></img>
              <p className="video-title text-white">Very cool video title</p>
              <FontAwesomeIcon
                className="plus-icon"
                icon={faPlusCircle}
                size="3x"
              />
            </div>
          </a>
        </article>

        {getSearchData()}
      </div>
    </div>
  );
}
