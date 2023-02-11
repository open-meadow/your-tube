// import css
import "./Video.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// import components
import Navigation from "components/Navigation";
import VideoPlayer from "components/VideoPlayer";
import { useGlobalContext } from "context/context";

// import from React
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";

import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";

export default function Video(props) {
  const [video, setVideo] = useState(null);
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
  } = useGlobalContext();

  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  let playlistId = searchParams.get("playlistId");
  let videoIndex = searchParams.get("index");
  // console.log("searchParams", playlistId);
  // console.log("searchParams", videoIndex);
  // for (const [key, value] of searchParams) {
  //   console.log(key, value);
  // }

  const thisPlaylist = playlists.filter(
    (playlist) => playlist.playlist_id == playlistId
  );

  // console.log("playlistid exists");
  // console.log("playlists", playlists);

  // console.log("thisPlaylist: ", thisPlaylist);

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
        {previousVideo && (
          <Link
            to={`/video/${previousVideo}?playlistId=${
              thisPlaylist[0].playlist_id
            }&index=${Number(videoIndex) - 1}`}
          >
            <div>Previous</div>
          </Link>
        )}

        <>{thisPlaylist[0].playlist_name}</>

        {nextVideo && (
          <Link
            to={`/video/${nextVideo}?playlistId=${
              thisPlaylist[0].playlist_id
            }&index=${Number(videoIndex) + 1}`}
          >
            <div>Next</div>
          </Link>
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
      <hr className="break-line"></hr>
      <main>
        {thisPlaylist.length !== 0 && (
          <div className="playlist-nav">{showPlaylistInfo(thisPlaylist)}</div>
        )}
        <div className="video">
          {loadingState && (
            <Spinner
              className="loading-spin"
              animation="border"
              variant="light"
              role="status"
            />
          )}
          {!loadingState && <VideoPlayer id={id} />}
        </div>
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
                  size="3x"
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
    </div>
  );
}
