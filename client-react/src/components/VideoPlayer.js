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
  const { id, opts, onEnd } = props;

  return (
    <YouTube videoId={id} opts={opts} onEnd={onEnd} />
  );
}
