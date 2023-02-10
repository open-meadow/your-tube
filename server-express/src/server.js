require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

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
app.get('/download/:id', (req, res) => {
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

  ytdl(videoUrl).pipe(fs.createWriteStream('video.mp4'));
});



app.use(function (req, res) {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
