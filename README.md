Your-Tube
=========

"Your-Tube" is an alternative YouTube front-end that removes all external distractions to create a minimalist interface to help users focus on studies or work. It obtains data search and video data from the Invidious API. 

It has the following features
- <b>Audio-only mode:</b> Allows users to listen to videos. (Helps to reduce bandwidth when listening to music compilations)
- <b>Ad-free streaming</b>
- <b>Video Downloads</b>
- <b>Toggle between Multiple Players:</b> Invidious player allows audio-only mode and ad-free streaming. YouTube player allows faster loading and plays live-streams.
- <b>Automatic switching between instances:</b> If an Invidious instance is down, the app will automatically switch to a working one.
- <b>Playlists:</b> Players can create custom playlists to add and delete videos. Videos accessed from playlists have autoplay enabled as well as their own interface allowing easy access to other videos. You will never need to alt-tab back to the browser.
- <b>Zero distractions:</b> Clean interface with no unneeded tab elements. We aim to keep you on our site as little as possible.   

***
This is a final project created during my studies at Lighthouse Labs. It is a collaborative effort from the following users.
 - [@open-meadow](https://github.com/open-meadow)
 - [@wundeeh](https://github.com/wundeeh)
 - [@willsmores](https://github.com/willsmores) 

## Final Product
> Screenshot of Home Page
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/home_page.png)

> Screenshot of Search Results
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/search_results.png)

> Screenshot of Video Page
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/video_page_invidious_video.png)

> Screenshot of Video Page playing Video in Audio mode
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/video_page_invidious_audio_mode.png)

> Screenshot of Downloaded File
![screenshot](https://github.com/open-meadow/your-tube/blob/master/docs/video_page_downloads.png)

> Screenshot of Playlist Sidebar
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/playlist_sidebar.png)

> Screenshot of Video Page in Playlist View
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/video_page_playlist_view.png)

> Screenshot of Add to Playlist button
![screenshot](https://github.com/open-meadow/your-tube/blob/87262de1adb3b7e7bdfa6803a7632f8a6f786cce/docs/add_to_new_playlist.png)

## Getting Started
- You need to have Node JS installed on your computer. You can download it at (https://nodejs.org/en/).
- Once you have Node JS, go to your desired folder, open the terminal or command prompt, and type <code>git@github.com:open-meadow/your-tube.git</code>, if you have git. Alternatively, you can download the ZIP file and extract it to your desired folder.
- Once done, navigate to the folder containing the downloaded code, and open your terminal or command prompt in the same folder ( Windows users, click on the empty space on the box beside the search bar and type 'cmd'). Type `npm install` Windows users may need to run cmd as administrator.
- Once installed, navigate to the `server-express` folder, open cmd and type `npm run local` and click `Enter`.
- Navigate to the `client-react` folder, open cmd and type `npm start`
- Go to your favourite web browser, and type `localhost:3002` in the address bar. Hit `Enter`. You should be able to access the client website.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- Nodemon
- Dotenv
- ytdl-core
- ffmpeg

## Known bugs

- The video page may have display issues on certain screen sizes.
- The Invidious video player cannot play livestreams.
- LocalCDN extension may cause font display errors.
