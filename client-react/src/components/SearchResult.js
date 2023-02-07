// React-Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function SearchResult(props) {
  const { getSearchData } = props;

  // HTML FontAwesome element for ease of implementation
  const plusIcon = (
    <FontAwesomeIcon className="plus-icon" icon={faPlusCircle} size="3x" />
  );

  // Hard coded video data for checking
  const videoData = {
    preview: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
    title: "Very cool video title changed",
  } 

  return (
    <div id="search-results">
      <article className="video-result">
        <div className="preview">
          <a href="/">
            <div className="link-to-video">
              <img
                className="video-header"
                src={videoData.preview}
                alt="header"
              ></img>
              <p className="video-title text-white">{videoData.title}</p>
            </div>
          </a>
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
              <Dropdown.Item onClick={() => console.log("Link 1 got clicked!")}>Playlist 1</Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Link 2 got clicked!")}>Playlist 2</Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Link 3 got clicked!")}> Playlist 3</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </article>

      {/* {getSearchData()} */}
    </div>
  );
}
