import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function SearchResult(props) {
  const { searchData } = props;

  const getSearchData = () => {
    const obtainedSearchData = searchData.map((single) => {
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
    </div>
  );
}
