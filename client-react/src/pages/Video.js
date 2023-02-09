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
    title,
    setTitle,
    description,
    setDescription,
    videoId,
    setVideoId,
  } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://inv.riverside.rocks/api/v1/videos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("video data: ", data);
        setTitle(data.title);
        setDescription(data.description);
      });
  }, [id]);

  return (
    <div className="Video-Page">
      <Navigation />
      <hr className="break-line"></hr>
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
      {!loadingState && (
        <div className="video-details">
          <h1>{title}</h1>
          <div>{description}</div>
        </div>
      )}
    </div>
  );
}
