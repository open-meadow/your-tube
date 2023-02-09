import React, { useContext, useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [status, setStatus] = useState({});
  const [username, setUsername] = useState();
  const [userid, setUserid] = useState();
  const [playlists, setPlaylists] = useState([]);

  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Used to update playlist sidebar on add video
  const [updatePL, setUpdatePL] = useState();

  const [show, setShow] = useState(false);

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
        show,
        setShow,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
