import React, { useEffect } from "react";

// import components
import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import Footer from "components/Footer";
import SearchResult from "components/SearchResult";
import SearchBar from "components/SearchBar";

import { useGlobalContext } from "context/context";

import { instanceList } from "helpers/selectInstance";

export default function Home(props) {
  const {
    status,
    setStatus,
    username,
    setUsername,
    userid,
    setUserid,
    playlists,
    setPlaylists,
    searchData,
    setSearchData,
    searchTerm,
    setSearchTerm,
    loadingState,
    setLoadingState,
    totalPages,
    setTotalPages,
    updatePL,
    setUpdatePL,
  } = useGlobalContext();

  const itemsPerPage = 5;

  const fetchSearchData = (instanceIndex) => {
    const currentInstance = instanceList[instanceIndex];
    setSearchData([]);
    setLoadingState(true);

    fetch(`${currentInstance}/api/v1/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchData(data);
        setLoadingState(false);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch((err) => {
        console.log("error: ", err);
        if (instanceIndex + 1 < instanceList.length) {
          fetchSearchData(instanceIndex + 1); // try the next instance
        } else {
          console.log("All instances failed."); // handle the failure
        }
      });
  };

  useEffect(() => {
    fetchSearchData(0);
  }, [searchTerm]);

  return (
    <div className="App">
      <Navigation username={username} playlists={playlists} />
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
