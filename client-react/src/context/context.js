import React, { useContext, useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [status, setStatus] = useState({});
  const [username, setUsername] = useState();
  const [userid, setUserid] = useState();
  const [playlists, setPlaylists] = useState([]);

  // search results
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Used to update playlist sidebar on add video
  const [updatePL, setUpdatePL] = useState();

  const [currentPlaylist, setCurrentPlaylist] = useState();

  // use to get video details
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authorThumbnails, setAuthorThumbnails] = useState(null);
  const [subCountText, setSubCountText] = useState(null);
  const [likeCount, setLikeCount] = useState(null);

  // use to show success message
  const [show, setShow] = useState(false);

  const [video, setVideo] = useState(null);
  // use to delete vid
  const [deleteVid, setDeleteVid] = useState("");

  return (
    <AppContext.Provider
      value={{
        status,
        setStatus,
        username,
        setUsername,
        userid,
        setUserid,
        playlists,
        setPlaylists,
        searchData,
        setSearchData,
        searchTerm,
        setSearchTerm,
        loadingState,
        setLoadingState,
        totalPages,
        setTotalPages,
        updatePL,
        setUpdatePL,
        title,
        setTitle,
        description,
        setDescription,
        author,
        setAuthor,
        authorThumbnails,
        setAuthorThumbnails,
        subCountText,
        setSubCountText,
        likeCount,
        setLikeCount,
        show,
        setShow,
        currentPlaylist,
        setCurrentPlaylist,
        video,
        setVideo,
        deleteVid,
        setDeleteVid,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
