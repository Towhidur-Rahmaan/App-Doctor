import { useEffect, useState } from "react";
import App from "../App/App";
import errorApp from "../../assets/assets/App-Error.png";
import { Link } from "react-router";

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("apps.json")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setLoading(false);
      });
  }, []);

  const filteredApps = apps.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl text-center mt-12 font-semibold">
        Our All Applications
      </h2>

      <p className="text-center text-gray-400 m-4">
        Discover our wide range of applications.
      </p>

      <div className="flex justify-between mx-8 mb-6">
        <span>({filteredApps.length}) Apps found</span>

        <input
          type="search"
          className="border rounded px-3 py-1"
          placeholder="🔎 Search Apps"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredApps.length === 0 ? (
        <div className="text-center mt-20">
          <div className="flex justify-center mb-10">
            <img src={errorApp} alt="App not found" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">OOPS!!! APP NOT FOUND</h2>
            <p className="text-gray-500 mt-2 mb-10">
              The app you are requesting is not found in our system .please try
              another app
            </p>
            <Link to="/" className="btn btn-primary mb-10">
              Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredApps.map((app) => (
            <App key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Apps;
