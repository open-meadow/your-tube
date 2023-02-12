import "App.css";
import axios from "axios";
import YouTube from "react-youtube";
import { React, useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Link,
  redirect,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function InvVideoPlayer(props) {
  // const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  // const videoId = "MWQkvbe5nyY";

  // const getVideoSource = async function (videoId) {
  //   const response = await fetch(invidiousEndpoint + videoId);
  //   console.log("response: ", response);
  //   const data = await response.json();
  //   return data.files[0].url;
  // };

  // const invidiousEndpoint = "https://invidious.sethforprivacy.com/watch?v=";
  // const finalLink = invidiousEndpoint + videoId;
  // console.log("final link is ", finalLink);

  const { id } = props

  const videoNode = useRef(null);

  useEffect(() => {
    const player = videojs(videoNode.current, {
      autoplay: true,
      controls: true,
      sources: [
        {
          // src: `//vjs.zencdn.net/v/oceans.mp4`,
          src: `https://invidious.nerdvpn.de/latest_version?id=_EvYpjTECGI&itag=22`,
          type: "video/mp4",
        },
      ],
      crossOrigin: "anonymous",
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
