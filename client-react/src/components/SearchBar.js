import useApplicationData from "hooks/useApplicationData";

export default function SearchBar(props) {
  // const {
  //   searchData,
  //   setSearchData,
  //   searchTerm,
  //   setSearchTerm,
  //   getSearchData,
  // } = useApplicationData();

  const { searchTerm, setSearchTerm } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event:", event);
    console.log("event target value: ", event.target.value);
    console.log("search term", searchTerm);
    // getSearchData();
  };

  return (
    <div>
      <form onSubmit={(event) => {
        console.log("form event: ", event);
      }}>
        <input
          className="search-bar"
          placeholder=" Search by URL or keyword"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
        <button onClick={handleSubmit} className="search-bar button">
          Search
        </button>
      </form>
    </div>
  );
}
