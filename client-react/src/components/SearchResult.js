import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function SearchResult(props) {
  const { getSearchData } = props;
  
  return (
    <div id="search-results">
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
