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
import { useGlobalContext } from "context/context";

export default function InvVideoPlayer(props) {
  const { id, itag, opts, onEnd } = props;

  const [workingInstance, setWorkingInstance] = useState(null);

  const instanceList = [
    "https://invidious.baczek.me",
    "https://vid.puffyan.us",
    "https://inv.riverside.rocks",
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
    "https://yewtu.be",
  ];

  const videoNode = useRef(null);

  async function getWorkingInstance(instanceList) {
    for (let instance of instanceList) {
      const response = await fetch(
        `${instance}/embed/W6NZfCO5SIk`
      );
      console.log("response: ", response);
      if (response.ok) {
        return instance;
      }
    }
    return null;
  }

  useEffect(() => {
    (async () => {
      const instance = await getWorkingInstance(instanceList);
      console.log("this is instance", instance);
      setWorkingInstance(instance);
      console.log("working instance", workingInstance);
    })();
  }, []);


  console.log("itag: ", itag);

  useEffect(() => {
    const player = videojs(videoNode.current, {
      width: opts.width,
      height: opts.height,
      autoplay: opts.playerVars.autoplay,
      controls: true,
      sources: [
        {
          // src: `//vjs.zencdn.net/v/oceans.mp4`,
          // src: `${workingInstance}/latest_version?id=W6NZfCO5SIk&itag=22`,
          src: `https://invidious.baczek.me/latest_version?id=${id}&itag=${itag}`,
          type: "video/mp4",
        },
      ],
      crossOrigin: "anonymous",
    });

    player.on("ended", onEnd);

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
