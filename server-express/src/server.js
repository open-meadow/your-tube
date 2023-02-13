require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const readline = require("readline");
const ffmpeg = require("ffmpeg-static");

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
const videoApiRoutes = require("../routes/videos-api");

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the resource routes here
app.use("/api/users", userApiRoutes);
app.use("/api/playlists", playlistApiRoutes);
app.use("/api/videos", videoApiRoutes);

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

  const output = path.resolve(__dirname, `${videoId}.mp4`);

  // Get audio and video streams
  const audio = ytdl(videoUrl, { quality: "highestaudio" });
  const video = ytdl(videoUrl, { quality: "highestvideo" });

  // Start the ffmpeg child process
  const ffmpegProcess = cp.spawn(
    // execute ffmpeg command
    ffmpeg,
    // array of options for ffmpeg process
    [
      // Remove ffmpeg's console spamming
      "-loglevel",
      "8",
      "-hide_banner",

      // Set inputs - pipe 3 takes audio, pipe 4 takes video
      "-i",
      "pipe:3",
      "-i",
      "pipe:4",

      // Map audio & video from streams
      "-map",
      // audio
      "0:a",
      "-map",
      // video
      "1:v",

      // Keep encoding - copy input source to output file without re-encoding
      "-c:v",
      "copy",
      // Define output file
      output,
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
      ],
    }
  );

  res.setHeader("Content-disposition", `attachment; filename=${videoId}.mp4`);
  res.setHeader("Content-Type", "video/mp4");

  ffmpegProcess.on("close", () => {
    const readStream = fs.createReadStream(output);
    readStream.pipe(res);

    res.on("finish", () => {
      fs.unlink(output, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${output} was deleted`);
        }
      });
    });

    console.log("done");
  });

  // Link streams

  audio.pipe(ffmpegProcess.stdio[3]);
  video.pipe(ffmpegProcess.stdio[4]);
});

app.use(function (req, res) {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
