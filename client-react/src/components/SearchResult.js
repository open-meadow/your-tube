// Import React
import { useState, useEffect } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import { Popover } from "react-bootstrap";

// Import Pagination
import Pagination from "./Pagination";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";

// Other Imports
import { useGlobalContext } from "context/context";

import Success from "./Success";

export default function SearchResult(props) {
  const { searchData, loadingState, totalPages, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVid, setCurrentVid] = useState({});

  // Get playlists from global context
  const { playlists } = useGlobalContext();

  const [successMsg, setSuccessMsg] = useState("");

  const plusIcon = (
    <FontAwesomeIcon className="plus-icon" icon={faPlusCircle} size="3x" />
  );

  const { setUpdatePL, setShow, show } = useGlobalContext();

  // divide obtained data by page number
  const currentData = searchData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get actual data from components
  const getSearchData = () => {
    if (loadingState) {
      return (
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }

    // Add video to playlist
    const handleSubmit = (vidId, title, plId) => {
      axios
        .put(`/api/playlists/${plId}`, { vidId, title, plId })
        .then((res) => {
          console.log(res);
          setUpdatePL(vidId);
          setSuccessMsg(`${title} successfully added to playlist!`);
          setShow(true);
        });
    };

    // Seed playlists into the "add to playlist" button
    const arrayOfPlaylists = playlists;

    const playlistNames = arrayOfPlaylists.map((playlist) => {
      return (
        <Dropdown.Item
          key={playlist.playlist_id}
          onClick={() =>
            handleSubmit(
              currentVid.videoId,
              currentVid.title,
              playlist.playlist_id
            )
          }
        >
          {playlist.playlist_name}
        </Dropdown.Item>
      );
    });

    if (show) {
      return <Success message={successMsg} />;
    }

    return currentData.map((single) => {
      if (single.type === "video") {
        return (
          <div className="video-result" key={single.videoId}>
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
                    onClick={() => setCurrentVid(single)}
                  >
                    <Dropdown.Header>Add to playlist:</Dropdown.Header>
                    <Dropdown.Divider />
                    {playlistNames}
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
