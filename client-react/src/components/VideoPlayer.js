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
  useNavigate
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

  const { id, opts, onEnd } = props;
  // const invidiousEndpoint = "https://invidious.sethforprivacy.com/watch?v=";
  // const finalLink = invidiousEndpoint + videoId;
  // console.log("final link is ", finalLink);

  // const videoNode = useRef(null);

  // useEffect(() => {
  //   const player = videojs(videoNode.current, {
  //     autoplay: true,
  //     controls: true,
  //     sources: [
  //       {
  //         src: `invidio.us/latest_version?id=BpwJeXrC5Kg&itag=22&local=true`,
  //         type: "video/mp4",
  //       },
  //     ],
  //     crossOrigin: 'anonymous'
  //   });

  //   fetch(
  //     "invidio.us/latest_version?id=BpwJeXrC5Kg&itag=22&local=true"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("dataaaaa: ", data);
  //       player.src({
  //         src: data.url,
  //         type: data.type,
  //       });
  //     });

  //   return () => {
  //     player.dispose();
  //   };
  // }, []);

  const navigate = useNavigate();

  // const red = () => {
  //   console.log("video ended");
  //   navigate("/");
  // }

  return (
    // <video
    //   ref={videoNode}
    //   className="video-js vjs-default-skin vjs-big-play-centered"
    // />
    <YouTube videoId={id} opts={opts} onEnd={onEnd} />
  );
}
