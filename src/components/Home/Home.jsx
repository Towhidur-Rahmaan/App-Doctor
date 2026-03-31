import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import App from "../App/App";
import { Link } from "react-router";

const Home = () => {
  const [apps, setApps] = useState([]);
  const getRandomApps = (apps, count) => {
    return [...apps].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const trendingApps = getRandomApps(apps, 8);

  useEffect(() => {
    fetch("apps.json")
      .then((response) => response.json())
      .then((data) => setApps(data));
  }, []);

  return (
    <div>
      <Hero></Hero>
      <h2 className="text-4xl text-center font-semibold m-6">Trending Apps</h2>
      <p className="text-center">
        Explore All Trending Apps on the Market developed by us
      </p>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-6">
          {trendingApps.map((app) => (
            <App key={app.id} app={app}></App>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/apps" className="btn btn-primary mb-20">
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
