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
import SearchResult from "components/SearchResult";
import SearchBar from "components/SearchBar";

export default function App() {
  const [status, setStatus] = useState({});

  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    setSearchData([]);
    setLoadingState(true);

    fetch(`https://invidious.sethforprivacy.com/api/v1/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("this is data: ", data);
        setSearchData(data);
        setLoadingState(false);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      });
  }, [searchTerm]);

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
      <Navigation />
      <hr className="break-line"></hr>
      <MainContent />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResult
        loadingState={loadingState}
        searchData={searchData}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
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
    </div>
  );
}
