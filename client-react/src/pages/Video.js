// import css
import "./Video.css";
import Spinner from "react-bootstrap/Spinner";

// import components
import Navigation from "components/Navigation";
import VideoPlayer from "components/VideoPlayer";
import { useGlobalContext } from "context/context";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
  } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    setLoadingState(true);
    fetch(`https://inv.riverside.rocks/api/v1/videos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("video data: ", data);
        setLoadingState(false);
        setTitle(data.title);
        setDescription(data.description);
        setAuthor(data.author);
        setSubCountText(data.subCountText);
        setLikeCount(data.likeCount);
        setAuthorThumbnails(data.authorThumbnails[2].url);
      });
  }, [id]);

  return (
    <div className="Video-Page">
      <Navigation />
      <hr className="break-line"></hr>
      <main>
        <div className="video">
          {loadingState && (
            <Spinner
              className="loading-spin"
              animation="border"
              variant="light"
              role="status"
            />
          )}
          {!loadingState && <VideoPlayer />}
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
              <h3>{likeCount}</h3>
            </div>
          )}
          <hr className="break-line"></hr>
          {!loadingState && <div>{description}</div>}
        </section>
      </main>
    </div>
  );
}
