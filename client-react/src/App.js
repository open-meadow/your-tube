import axios from "axios";
import { React, useEffect, useState } from "react";
import YouTube from "react-youtube";

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
import useApplicationData from "hooks/useApplicationData";

export default function App() {
  const [status, setStatus] = useState({});
  const {
    searchData,
    setSearchData,
    searchTerm,
    setSearchTerm,
    getSearchData,
  } = useApplicationData();

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

      <SearchResult getSearchData={getSearchData} />
      <Footer />
    </div>
  );
}
