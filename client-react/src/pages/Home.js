// import components
import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import Footer from "components/Footer";
import SearchResult from "components/SearchResult";
import SearchBar from "components/SearchBar";
import VideoPlayer from "components/VideoPlayer";

import { useGlobalContext } from "context/context";

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
  } = useGlobalContext();

  const { itemsPerPage } = props;

  return (
    <div className="App">
      <Navigation username={username} playlists={playlists} />
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