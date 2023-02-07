export default function SearchBar() {
  return (
    <div>
      <form>
        <input
          className="search-bar"
          placeholder=" Search by URL or keyword"
        ></input>
        <button className="search-bar button">Search</button>
      </form>
    </div>
  );
}
