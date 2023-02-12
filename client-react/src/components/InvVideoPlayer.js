import "App.css";
import { React, useEffect, useState, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function InvVideoPlayer(props) {
  const { id, itag, opts, onEnd } = props;

  const instanceList = [
    "https://invidious.baczek.me",
    "https://vid.puffyan.us",
    "https://inv.riverside.rocks",
    "https://yewtu.be",
    "https://invidious.kavin.rocks",
    "https://watch.thekitty.zone",
    "https://y.com.sb",
    "https://invidious.nerdvpn.de",
    "https://invidious.tiekoetter.com",
    "https://yt.artemislena.eu",
    "https://invidious.flokinet.to",
    "https://inv.bp.projectsegfau.lt",
    "https://inv.odyssey346.dev",
    "https://invidious.sethforprivacy.com",
    "https://invidious.snopyta.org",
    "https://yt.funami.tech",
    "https://invidious.epicsite.xyz",
    "https://iv.ggtyler.dev",
    "https://inv.vern.cc",
    "https://yt.oelrichsgarcia.de",
    "https://invidious.silur.me",
    "https://invidious.slipfox.xyz",
    "https://invidious.weblibre.org",
    "https://invidious.esmailelbob.xyz",
    "https://iv.melmac.space",
    "https://invidious.dhusch.de",
    "https://invidious.privacydev.net",
    "https://invidious.lidarshield.cloud",
    "https://invidious.namazso.eu",
  ];

  const videoNode = useRef(null);

  // create sources from instanceArray
  let currentSourceIndex = 0;
  const sources = [];
  for (let i = 0; i < instanceList.length; i++) {
    let srcObj = {
      src: `${instanceList[i]}/latest_version?id=${id}&itag=${itag}`,
      type: "video/mp4"
    }
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
      poster: `https://cdn.pixabay.com/photo/2014/03/04/07/14/music-279332_960_720.jpg`,
      controls: true,
      sources: sources,
      crossOrigin: "anonymous",
    });

    player.ready(function () {
      console.log("Current source URL:", player.currentSrc());
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
  }, []);

  return (
    <video
      ref={videoNode}
      className="video-js vjs-theme-forest"
    />
  );
}
