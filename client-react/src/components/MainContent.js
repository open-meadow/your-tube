export default function MainContent() {
  return (
    <div className="main-content">
      <div className="main-words">
        <h1 className="welcome-text text-white">Study without distraction</h1>
      </div>

      <div className="get-started">
        <h5 className="welcome-text text-white">
          Get started by adding a video to your study playlist
        </h5>
      </div>

      <div>
        <form>
          <input
            className="search-bar"
            placeholder=" Search by URL or keyword"
          ></input>
          <button className="search-bar button">Search</button>
        </form>
      </div>
    </div>
  );
}
