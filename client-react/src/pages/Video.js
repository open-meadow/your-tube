// import css
import "./Video.css";
import "App.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faArrowLeft,
  faArrowRight,
  faArrowRightArrowLeft,
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
  } = useGlobalContext();

  const { id } = useParams();
  const navigate = useNavigate();
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

  const showPlaylistInfo = (thisPlaylist) => {
    console.log("this playlist", thisPlaylist);
    console.log("videoID; ", videoIndex);

    const previousVideo = thisPlaylist[0].videos[Number(videoIndex) - 1]
      ? Object.keys(thisPlaylist[0].videos[Number(videoIndex) - 1])
      : null;

    const nextVideo = thisPlaylist[0].videos[Number(videoIndex) + 1]
      ? Object.keys(thisPlaylist[0].videos[Number(videoIndex) + 1])
      : null;

    return (
      <>
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
      </>
    );
  };

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

  const showVideoPlayer = (autoplay) => {
    const opts = {
      width: "1280",
      height: "720",
      playerVars: {
        autoplay: autoplay,
      },
    };

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
          <VideoPlayer id={id} opts={opts} onEnd={onEnd} />
        )}
      </>
    );
  };

  const downloadVideo = () => {
    console.log("you are in downloadVideo");
    axios
      .get(`/download/${id}`, {
        responseType: "blob",
      })
      .then((res) => setVideo(URL.createObjectURL(new Blob([res.data]))))
      .catch((err) => console.error(err));
  };

  return (
    <div className="Video-Page">
      <Navigation />
      <main>
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
              <div className="channel-details">
                <img src={authorThumbnails} />
                <h3>{author}</h3>
                <h3 className="add-line">{subCountText}</h3>
              </div>
              <div className="channel-details">
                <FontAwesomeIcon
                  className="thumbs-up-icon"
                  icon={faThumbsUp}
                  size="2x"
                />
                <h3 className="add-line">{likeCount}</h3>
              </div>
              <Button
                variant="outline-light"
                className="download-button"
                onClick={downloadVideo}
              >
                Download
              </Button>
            </div>
          )}
          <hr className="break-line"></hr>
          {!loadingState && <div>{description}</div>}
        </section>
      </main>
      <Footer />
    </div>
  );
}
