import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function SearchResult(props) {
  const { searchData, loadingState, totalPages, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = searchData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSearchData = () => {
    if (loadingState) {
      return (
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }

    const obtainedSearchData = currentData.map((single) => {
      if (single.title) {
        return (
          <div className="video-result">
            <a href="/">
              <div className="preview">
                <img
                  className="video-header"
                  src={single.videoThumbnails && single.videoThumbnails[1].url}
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
    });

    return obtainedSearchData;
  };

  return (
    <div id="search-results">
      {/* placeholder */}
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
