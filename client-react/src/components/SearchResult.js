import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function SearchResult(props) {
  const { searchData, loadingState, totalPages, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);

  // divide obtained data by page number
  const currentData = searchData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // get actual data from components
  const getSearchData = () => {
    if (loadingState) {
      return (
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }

    return currentData.map((single) => {
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
  };

  return (
    <div id="search-results">
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
