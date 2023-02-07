import { useState } from "react";

export default function SearchBar(props) {
  // const {
  //   searchData,
  //   setSearchData,
  //   searchTerm,
  //   setSearchTerm,
  //   getSearchData,
  // } = useApplicationData();
  const [inputValue, setInputValue] = useState('');

  const { searchTerm, setSearchTerm } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder=" Search by URL or keyword"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        ></input>
        <button
          type="submit"
          onClick={handleSubmit}
          className="search-bar button"
        >
          Search
        </button>
      </form>
    </div>
  );
}
