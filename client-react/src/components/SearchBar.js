import { useGlobalContext } from "context/context";

export default function SearchBar(props) {
  const { setSearchTerm, inputValue, setInputValue } = useGlobalContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <div className="search">
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
