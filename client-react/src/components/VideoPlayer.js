import "App.css";
import axios from "axios";
import YouTube from "react-youtube";
import { React, useEffect, useState, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer() {
  const invidiousEndpoint = "https://invidio.us/api/v1/videos/";
  const videoId = "MWQkvbe5nyY";

  // const getVideoSource = async function (videoId) {
  //   const response = await fetch(invidiousEndpoint + videoId);
  //   console.log("response: ", response);
  //   const data = await response.json();
  //   return data.files[0].url;
  // };

  const videoNode = useRef(null);

  useEffect(() => {
    const player = videojs(videoNode.current, {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: "//vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4",
        },
      ],
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
