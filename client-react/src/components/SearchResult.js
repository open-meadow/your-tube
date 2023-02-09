// Import React
import { useState, useEffect } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";

// Import Pagination
import Pagination from "./Pagination";
import { Popover } from "react-bootstrap";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import Video from "pages/Video";

export default function SearchResult(props) {
  const { searchData, loadingState, totalPages, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const plusIcon = (
    <FontAwesomeIcon className="plus-icon" icon={faPlusCircle} size="3x" />
  );

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
    
    
  // add video to playlist
  const handleSubmit = (vidId, title, plId) => {
    axios
      .put("/api/playlists/1", {vidId, title, plId})
      .then((res) => {
        console.log(res)
      })
  }

    return currentData.map((single) => {
      if (single.type === "video") {
        return (
          <div className="video-result">
            <Link to={`/video/${single.videoId}`}>
              <div className="preview">
                <img
                  className="video-header"
                  src={single.videoThumbnails && single.videoThumbnails[1].url}
                  alt="header"
                ></img>

                <div className="video-title text-white">{single.title}</div>

                <div
                  className="add-to-playlist"
                  onClick={(event) =>
                    event.preventDefault() && event.stopPropagation()
                  }
                >
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={plusIcon}
                    drop="down-centered"
                    style={{
                      background: "none",
                      border: "none",
                      boxShadow: "none",
                      padding: 0,
                    }}
                  >
                    <Dropdown.Header>Add to playlist:</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => handleSubmit(single.videoId, single.title)}
                    >
                      Playlist 1
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => console.log("Link 2 got clicked!")}
                    >
                      Playlist 2
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => console.log("Link 3 got clicked!")}
                    >
                      {" "}
                      Playlist 3
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div id="search-results">
      <hr className="break-line" />
      {getSearchData()}
      {!loadingState && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
