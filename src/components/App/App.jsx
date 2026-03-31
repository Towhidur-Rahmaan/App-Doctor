import React from "react";
import download from "../../assets/assets/icon-downloads.png";
import { Link } from "react-router";

const App = ({ app }) => {
  const { id, title, image, downloads, ratings } = app;

  const totalRatings = ratings.reduce((sum, r) => sum + r.count, 0);

  const totalStars = ratings.reduce((sum, r) => {
    const star = parseInt(r.name);
    return sum + star * r.count;
  }, 0);

  const ratingAvg = (totalStars / totalRatings).toFixed(1);

  const downloadsInM = (downloads / 1000000).toFixed(1) + "M";

  return (
    <Link to={`/app/${id}`}>
      <div className="bg-base-200 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt={title}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title ">{title}</h2>

          <div className="card-actions flex justify-between ">
            <button className="btn btn-neutral text-green-500 ">
              <img className="w-3" src={download} alt="Downloads" />
              {downloadsInM}
            </button>

            <button className="btn btn-neutral text-sm text-orange-500">
              ⭐ {ratingAvg}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default App;
