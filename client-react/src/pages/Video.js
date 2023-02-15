// import css
import "./Video.css";
import "App.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faArrowLeft,
  faArrowRight,
  faArrowRightArrowLeft,
  faDownload,
  faVideo,
  faHeadphones,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

// import components
import Navigation from "components/Navigation";
import VideoPlayer from "components/VideoPlayer";
import Footer from "components/Footer";
import { useGlobalContext } from "context/context";

// import from React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link, useSearchParams, redirect } from "react-router-dom";

import axios from "axios";
import { Container, Nav, Navbar } from "react-bootstrap";
import InvVideoPlayer from "components/InvVideoPlayer";

export default function Video(props) {
  const {
    loadingState,
    setLoadingState,
    title,
    setTitle,
    description,
    setDescription,
    author,
    setAuthor,
    authorThumbnails,
    setAuthorThumbnails,
    subCountText,
    setSubCountText,
    likeCount,
    setLikeCount,
    playlists,
    setPlaylists,
    currentPlaylist,
    setCurrentPlaylist,
    video,
    setVideo,
    audio,
    setAudio,
    currentTab,
    setCurrentTab,
  } = useGlobalContext();

  const { id } = useParams();
  const navigate = useNavigate();

  // get playlist id and video index from params
  let [searchParams, setSearchParams] = useSearchParams();
  let playlistId = searchParams.get("playlistId");
  let videoIndex = searchParams.get("index");

  const thisPlaylist = playlists.filter(
    (playlist) => playlist.playlist_id == playlistId
  );

  useEffect(() => {
    setLoadingState(true);
    fetch(`https://inv.riverside.rocks/api/v1/videos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadingState(false);
        setTitle(data.title);
        setDescription(data.description);
        setAuthor(data.author);
        setSubCountText(data.subCountText);
        setLikeCount(data.likeCount);
        setAuthorThumbnails(data.authorThumbnails[2].url);
      });
  }, [id]);

  // function to show playlist name and navigation buttons
  const showPlaylistInfo = (thisPlaylist) => {
    const previousVideo = thisPlaylist[0].videos[Number(videoIndex) - 1]
      ? Object.keys(thisPlaylist[0].videos[Number(videoIndex) - 1])
      : null;

    const nextVideo = thisPlaylist[0].videos[Number(videoIndex) + 1]
      ? Object.keys(thisPlaylist[0].videos[Number(videoIndex) + 1])
      : null;

    return (
      <div className="playlist-info">
        {!loadingState && previousVideo && (
          <Link
            to={`/video/${previousVideo}?playlistId=${
              thisPlaylist[0].playlist_id
            }&index=${Number(videoIndex) - 1}`}
          >
            <Container className="arrow left">
              <FontAwesomeIcon icon={faArrowLeft} size="3x" />
            </Container>
          </Link>
        )}

        <div className="playlist-title">
          <h1>{thisPlaylist[0].playlist_name}</h1>
        </div>

        {!loadingState && nextVideo && (
          <Link
            to={`/video/${nextVideo}?playlistId=${
              thisPlaylist[0].playlist_id
            }&index=${Number(videoIndex) + 1}`}
          >
            <Container className="arrow right">
              <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </Container>
          </Link>
        )}
      </div>
    );
  };

  // if video is part of a playlist, redirect to next video of playlist
  const onEnd = () => {
    const nextVideo = thisPlaylist[0].videos[Number(videoIndex) + 1]
      ? Object.keys(thisPlaylist[0].videos[Number(videoIndex) + 1])
      : null;

    if (nextVideo) {
      return navigate(
        `/video/${nextVideo}?playlistId=${thisPlaylist[0].playlist_id}&index=${
          Number(videoIndex) + 1
        }`
      );
    }
  };

  // video player
  const showVideoPlayer = (autoplay) => {
    const [width, height] = window.innerWidth > 1400 ? [1280, 720] : [640, 360];

    const opts = {
      width: "1280",
      height: "720",
      playerVars: {
        autoplay: autoplay,
      },
    };

    const itag = audio ? 18 : 140;

    return (
      <>
        {loadingState ? (
          <Spinner
            className="loading-spin"
            animation="border"
            variant="light"
            role="status"
          />
        ) : (
          <>
            <div className="video-player">
              {currentTab === "invidious" && (
                <div>
                  <InvVideoPlayer
                    id={id}
                    itag={itag}
                    opts={opts}
                    onEnd={onEnd}
                  />
                </div>
              )}
              {currentTab === "youtube" && (
                <div>
                  <VideoPlayer id={id} opts={opts} onEnd={onEnd} />
                </div>
              )}
            </div>

            <div className="video-buttons">
              <Button
                className="single-video-button"
                variant="outline-light"
                size="lg"
                onClick={() => setCurrentTab("invidious")}
                active={currentTab === "invidious"}
              >
                Invidious
              </Button>
              <Button
                className="single-video-button"
                variant="outline-light"
                size="lg"
                onClick={() => setCurrentTab("youtube")}
                active={currentTab === "youtube"}
              >
                YouTube
              </Button>
            </div>
          </>
        )}
      </>
    );
  };

  // function for downloading video
  const downloadVideo = () => {
    axios
      .get(`/download/${id}`, {
        responseType: "blob",
      })
      .then((res) => {
        // A blob is an object that stores the type of a file, and the size of the file in bytes. URL.createObjectURL creates a new URL from the blob
        const url = URL.createObjectURL(new Blob([res.data]));

        // Create an 'a' in the html and click it
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${id}.mp4`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.error(err));
  };

  // function to switch between audio and video
  const audioSwitch = () => {
    if (audio === true) {
      setAudio(false);
      sessionStorage.setItem("audio", false);
    } else {
      setAudio(true);
      sessionStorage.setItem("audio", true);
    }
    window.location.reload();
  };

  const [isShown, setIsShown] = useState(true);

  const handleClick = (event) => {
    // 👇️ toggle visibility
    setIsShown((current) => !current);
  };

  return (
    <div className="Video-Page">
      <Navigation />
      <br />
      <main>
        {/* show/hide playlist border */}
        {thisPlaylist.length !== 0 && (
          <div className="playlist-border">
            <div className="playlist-nav">{showPlaylistInfo(thisPlaylist)}</div>
            <div className="video">{showVideoPlayer(1)}</div>
          </div>
        )}
        {thisPlaylist.length === 0 && (
          <div className="video">{showVideoPlayer(0)}</div>
        )}

        <hr className="break-line"></hr>

        <section className="below-video">
          {!loadingState && <h1>{title}</h1>}
          <hr className="break-line"></hr>
          {!loadingState && (
            <div className="video-details">
              {/* Channel details */}
              <div className="video-details-buttons">
                <img src={authorThumbnails} />
                <h4>{author}</h4>
                <h4 className="add-line">{subCountText}</h4>
              </div>

              {/* Like button */}
              <div className="video-details-buttons">
                <FontAwesomeIcon
                  className="video-details-icons"
                  icon={faThumbsUp}
                  size="2x"
                />
                <h4 className="add-line">{likeCount}</h4>
              </div>
              {/* DSescription button */}
              <Button
                className="toggle-description video-details-buttons"
                onClick={handleClick}
              >
                <FontAwesomeIcon
                  className="video-details-icons"
                  icon={faInfo}
                  size="2x"
                />
                Toggle Description
              </Button>
              {/* Download button */}
              <Button
                variant="outline-light"
                className="video-details-buttons download-button"
                onClick={downloadVideo}
              >
                <FontAwesomeIcon
                  className="video-details-icons"
                  icon={faDownload}
                  size="2x"
                />
                Download
              </Button>

              {/* Audio/Video buttons */}
              {currentTab === "invidious" && audio && (
                <Button
                  variant="outline-light"
                  className="video-details-buttons download-button"
                  onClick={audioSwitch}
                >
                  <FontAwesomeIcon
                    className="video-details-icons"
                    icon={faHeadphones}
                    size="2x"
                  />
                  Audio
                </Button>
              )}
              {currentTab === "invidious" && !audio && (
                <Button
                  variant="outline-light"
                  className="video-details-buttons download-button"
                  onClick={audioSwitch}
                >
                  <FontAwesomeIcon
                    className="video-details-icons"
                    icon={faVideo}
                    size="2x"
                  />
                  Video
                </Button>
              )}
            </div>
          )}
          <hr className="break-line"></hr>
          {!loadingState && (
            <div>
              <div
                className="video-description"
                style={{ display: isShown ? "none" : "block" }}
              >
                {description}
              </div>
            </div>
          )}
          <br />
        </section>
      </main>
      <Footer />
    </div>
  );
}
