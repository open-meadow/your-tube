import { React, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function useApplicationData() {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("pitch meeting");

  useEffect(() => {
    fetch(`https://invidious.sethforprivacy.com/api/v1/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchData(data));
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

  return {
    searchData,
    setSearchData,
    searchTerm,
    setSearchTerm,
    getSearchData,
  };
}
