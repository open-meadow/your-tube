import "App.css";
import axios from "axios";
import YouTube from "react-youtube";
import { React, useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer(props) {
  // const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  // const videoId = "MWQkvbe5nyY";

  // const getVideoSource = async function (videoId) {
  //   const response = await fetch(invidiousEndpoint + videoId);
  //   console.log("response: ", response);
  //   const data = await response.json();
  //   return data.files[0].url;
  // };

  const { id } = useParams();
  console.log("IDIDIDID:", id);
  const videoId = id;
  const invidiousEndpoint = "https://invidious.sethforprivacy.com/watch?v=";
  const finalLink = invidiousEndpoint + videoId;
  console.log("final link is ", finalLink);

  const videoNode = useRef(null);

  useEffect(() => {
    const player = videojs(videoNode.current, {
      autoplay: true,
      controls: true,
      sources: [
        // {
        //   src: "https://www.youtube.com/watch?v=7WY04KJb0fk",
        //   type: "video/mp4",
        // },
      ],
    });

    fetch("https://www.youtube.com/watch?v=7WY04KJb0fk")
      .then((response) => response.blob())
      .then((blob) => {
        player.src({
          src: URL.createObjectURL(blob),
          type: "video/mp4",
        });
      });

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <video
      ref={videoNode}
      className="video-js vjs-default-skin vjs-big-play-centered"
    />
  );
}
