require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const readline = require('readline');

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

  const video = ytdl(videoUrl, { itag: 18 });
  let starttime;
  video.pipe(fs.createWriteStream(output));
  video.once("response", () => {
    starttime = Date.now();
  });

  video.on("progress", (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    const estimatedDownloadTime =
      downloadedMinutes / percent - downloadedMinutes;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
    process.stdout.write(
      `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
        total /
        1024 /
        1024
      ).toFixed(2)}MB)\n`
    );
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(
      `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
    );
    readline.moveCursor(process.stdout, 0, -1);
  });

  video.on("end", () => {
    process.stdout.write("\n\n");
  });

});

app.use(function (req, res) {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
