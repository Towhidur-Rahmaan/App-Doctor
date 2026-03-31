import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [toast, setToast] = useState(""); // toast state

  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("installedApps")) || [];
    const exists = stored.find((a) => a.id === app?.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (exists) setInstalled(true);
  }, [app]);

  const handleInstall = () => {
    const stored = JSON.parse(localStorage.getItem("installedApps")) || [];

    const exists = stored.find((a) => a.id === app.id);

    if (!exists) {
      const updated = [...stored, app];
      localStorage.setItem("installedApps", JSON.stringify(updated));

      setInstalled(true);
      setToast("App Installed Successfully 🎉");

      setTimeout(() => setToast(""), 2000);
    }
  };

  useEffect(() => {
    fetch("/apps.json")
      .then((res) => res.json())
      .then((data) => {
        const singleApp = data.find((a) => a.id === parseInt(id));
        setApp(singleApp);
      });
  }, [id]);

  if (!app) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const {
    title,
    image,
    downloads,
    ratingAvg,
    reviews,
    description,
    size,
    ratings,
    companyName,
  } = app;

  return (
    <div className="px-10 py-10">
      {/* 🔥 Top Section */}
      <div className="flex gap-10 items-center border-b pb-6">
        <img src={image} alt={title} className="w-60 rounded" />

        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-600">Developed by {companyName}</p>

          <div className="flex gap-10 mt-4">
            <div>
              <p>Downloads</p>
              <h3 className="text-xl font-bold">
                {(downloads / 1000000).toFixed(1)}M
              </h3>
            </div>

            <div>
              <p>Rating</p>
              <h3 className="text-xl font-bold">{ratingAvg}</h3>
            </div>

            <div>
              <p>Reviews</p>
              <h3 className="text-xl font-bold">{reviews}</h3>
            </div>
          </div>

          <button
            onClick={handleInstall}
            disabled={installed}
            className={`btn mt-4 ${installed ? "btn-disabled" : "btn-success"}`}
          >
            {installed ? "Installed ✅" : `Install Now (${size})`}
          </button>

          {toast && (
            <div className="toast toast-top toast-end">
              <div className="alert alert-success">
                <span>{toast}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ⭐ Ratings Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Ratings</h3>

        {ratings
          .slice()
          .reverse()
          .map((r, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-16">{r.name}</span>

              <div className="w-full bg-gray-200 h-4 rounded">
                <div
                  className="bg-orange-500 h-4 rounded"
                  style={{ width: `${r.count / 1000}%` }} // ✅ fixed
                ></div>
              </div>
            </div>
          ))}
      </div>

      {/* 📄 Description */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Description</h3>
        <p className="text-gray-600 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default AppDetails;
