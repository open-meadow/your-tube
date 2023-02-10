require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const cp = require('child_process');
const path = require("path");
const readline = require("readline");
const ffmpeg = require('ffmpeg-static');

const app = express();
const PORT = process.env.PORT || 8000;

// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, "..", "public");
console.log("public dir: ", public);
app.use(express.static(public));

// Separate routes for each resource here
const userApiRoutes = require("../routes/users-api");
const playlistApiRoutes = require("../routes/playlists-api");

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the resource routes here
app.use("/api/users", userApiRoutes);
app.use("/api/playlists", playlistApiRoutes);

// Do Not make a route for "/" or it will override public

app.get("/api/status", (req, res) => {
  res.json({ version: "1.01" });
});

// download stuff
app.get("/download/:id", (req, res) => {
  console.log("Server speaking");
  console.log("req params id: ", req.params.id);

  const videoId = req.params.id;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // ytdl.getInfo(videoUrl, (err, info) => {
  // if (err) {
  //   console.error(err.message);
  //   return res.status(400).send({ error: err.message });
  // }

  // console.log("Info", info);
  // const video = ytdl(videoUrl, {
  //   quality: 'highestaudio',
  //   filter: 'audioonly'
  // });

  // res.setHeader('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
  // res.setHeader('Content-Type', 'audio/mpeg');

  // video.pipe(res);
  // });

  // ytdl.getInfo(videoUrl)
  // .then(response => {
  //   console.log("this is getInfo: ", response);
  // })

  const output = path.resolve(__dirname, "video.mp4");

  const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
    merged: { frame: 0, speed: "0x", fps: 0 },
  };

  // Get audio and video streams
  const audio = ytdl(videoUrl, { quality: "highestaudio" }).on(
    "progress",
    (_, downloaded, total) => {
      tracker.audio = { downloaded, total };
    }
  );
  const video = ytdl(videoUrl, { quality: "highestvideo" }).on(
    "progress",
    (_, downloaded, total) => {
      tracker.video = { downloaded, total };
    }
  );

  // Prepare the progress bar
  let progressbarHandle = null;
  const progressbarInterval = 1000;
  const showProgress = () => {
    readline.cursorTo(process.stdout, 0);
    const toMB = (i) => (i / 1024 / 1024).toFixed(2);

    process.stdout.write(
      `Audio  | ${(
        (tracker.audio.downloaded / tracker.audio.total) *
        100
      ).toFixed(2)}% processed `
    );
    process.stdout.write(
      `(${toMB(tracker.audio.downloaded)}MB of ${toMB(
        tracker.audio.total
      )}MB).${" ".repeat(10)}\n`
    );

    process.stdout.write(
      `Video  | ${(
        (tracker.video.downloaded / tracker.video.total) *
        100
      ).toFixed(2)}% processed `
    );
    process.stdout.write(
      `(${toMB(tracker.video.downloaded)}MB of ${toMB(
        tracker.video.total
      )}MB).${" ".repeat(10)}\n`
    );

    process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
    process.stdout.write(
      `(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${" ".repeat(
        10
      )}\n`
    );

    process.stdout.write(
      `running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(
        2
      )} Minutes.`
    );
    readline.moveCursor(process.stdout, 0, -3);
  };

  // Start the ffmpeg child process
  const ffmpegProcess = cp.spawn(
    ffmpeg,
    [
      // Remove ffmpeg's console spamming
      "-loglevel",
      "8",
      "-hide_banner",
      // Redirect/Enable progress messages
      "-progress",
      "pipe:3",
      // Set inputs
      "-i",
      "pipe:4",
      "-i",
      "pipe:5",
      // Map audio & video from streams
      "-map",
      "0:a",
      "-map",
      "1:v",
      // Keep encoding
      "-c:v",
      "copy",
      // Define output file
      "out.mkv",
    ],
    {
      windowsHide: true,
      stdio: [
        /* Standard: stdin, stdout, stderr */
        "inherit",
        "inherit",
        "inherit",
        /* Custom: pipe:3, pipe:4, pipe:5 */
        "pipe",
        "pipe",
        "pipe",
      ],
    }
  );
  ffmpegProcess.on("close", () => {
    console.log("done");
    // Cleanup
    process.stdout.write("\n\n\n\n");
    clearInterval(progressbarHandle);
  });

  // Link streams
  // FFmpeg creates the transformer streams and we just have to insert / read data
  ffmpegProcess.stdio[3].on("data", (chunk) => {
    // Start the progress bar
    if (!progressbarHandle)
      progressbarHandle = setInterval(showProgress, progressbarInterval);
    // Parse the param=value list returned by ffmpeg
    const lines = chunk.toString().trim().split("\n");
    const args = {};
    for (const l of lines) {
      const [key, value] = l.split("=");
      args[key.trim()] = value.trim();
    }
    tracker.merged = args;
  });
  audio.pipe(ffmpegProcess.stdio[4]);
  video.pipe(ffmpegProcess.stdio[5]);
});

app.use(function (req, res) {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
