import "../styles/App.css";
import YouTube from "react-youtube";
import { React, useEffect, useState, useRef } from "react";

export default function VideoPlayer(props) {
  const { id, opts, onEnd } = props;

  return (
    <YouTube videoId={id} opts={opts} onEnd={onEnd} />
  );
}
