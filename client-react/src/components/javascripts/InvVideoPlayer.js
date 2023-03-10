import "../styles/App.css";
import { React, useEffect, useRef } from "react";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/city/index.css";
import "@videojs/themes/dist/fantasy/index.css";
import "@videojs/themes/dist/forest/index.css";
import "@videojs/themes/dist/sea/index.css";

import { instanceList } from "helpers/selectInstance";

export default function InvVideoPlayer(props) {
  const { id, itag, opts, onEnd } = props;

  const videoNode = useRef(null);

  // create sources from instanceArray
  let currentSourceIndex = 0;
  const sources = [];
  for (let i = 0; i < instanceList.length; i++) {
    let srcObj = {
      src: `${instanceList[i]}/latest_version?id=${id}&itag=${itag}`,
      type: "video/mp4",
    };
    sources.push(srcObj);
  }

  const switchSource = (player) => {
    currentSourceIndex += 1;
    player.src(sources[currentSourceIndex]);
    player.load();
  };

  useEffect(() => {
    const player = videojs(videoNode.current, {
      width: opts.width,
      height: opts.height,
      autoplay: opts.playerVars.autoplay,
      controls: true,
      sources: sources,
      crossOrigin: "anonymous",
      audioOnlyMode: itag === 140,
      audioPosterMode: "none",
    });

    player.ready(function () {
      console.log("Current source URL:", player.currentSrc());
      // console.log("audio? ", player.isAudio());
    });

    player.on("error", function (error) {
      console.log("error: ", error);
      console.log("Current source URL:", player.currentSrc());
      switchSource(player);
    });

    player.on("ended", onEnd);

    return () => {
      player.dispose();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {itag === 18 && (
        <video ref={videoNode} className="video-js vjs-theme-forest" />
      )}
      {itag === 140 && (
        <audio ref={videoNode} className="video-js vjs-theme-fantasy" />
      )}
    </>
  );
}
