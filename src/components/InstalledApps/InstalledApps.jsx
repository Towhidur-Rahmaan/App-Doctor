import { useEffect, useState } from "react";
import download from "../../assets/assets/icon-downloads.png";

const InstalledApps = () => {
  const [apps, setApps] = useState([]);
  const [sortType, setSortType] = useState("");
  const [toast, setToast] = useState("");

  // format downloads (K / M)
  const formatDownloads = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  };

  // load apps from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("installedApps")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setApps(stored);
  }, []);

  // uninstall app
  const handleUninstall = (id, title) => {
    // show toast first
    setToast(`${title} uninstalled successfully`);

    // delay remove (IMPORTANT)
    setTimeout(() => {
      const updated = apps.filter((a) => a.id !== id);
      setApps(updated);
      localStorage.setItem("installedApps", JSON.stringify(updated));
    }, 500);

    // remove toast
    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // sorting
  let sortedApps = [...apps];

  if (sortType === "rating") {
    sortedApps.sort((a, b) => b.ratingAvg - a.ratingAvg);
  } else if (sortType === "size") {
    sortedApps.sort((a, b) => parseInt(a.size) - parseInt(b.size));
  }

  return (
    <>
      {/* ✅ TOAST (OUTSIDE MAIN DIV) */}
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div className="bg-green-500 text-white px-5 py-3 rounded shadow-lg">
            {toast}
          </div>
        </div>
      )}

      <div className="px-4 md:px-10 py-10">
        {/* Top */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Your Installed Apps
          </h2>
          <p className="mt-4 text-sm md:text-base">
            Explore all trending apps on market developed by us
          </p>
        </div>

        {/* Sort */}
        <div className="flex justify-end mb-6 mt-4">
          <select
            className="border px-2 py-1 text-black bg-white font-bold rounded"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="size">Size</option>
          </select>
        </div>

        {/* List */}
        {sortedApps.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No apps installed</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {sortedApps.map((app) => (
              <div
                key={app.id}
                className="bg-base-200 p-4 rounded shadow flex justify-between items-center"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-20 h-20 md:w-28 md:h-28 object-cover rounded"
                  />
                </div>

                {/* Middle */}
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg">{app.title}</h3>

                  <div className="flex gap-4 text-sm mt-2 items-center">
                    <div className="flex items-center gap-1">
                      <img src={download} alt="Downloads" className="w-4" />
                      <span>{formatDownloads(app.downloads)}</span>
                    </div>

                    <span>⭐ {app.ratingAvg}</span>
                    <span>{app.size} MB</span>
                  </div>
                </div>

                {/* Right Button */}
                <button
                  onClick={() => handleUninstall(app.id, app.title)}
                  className="btn btn-success"
                >
                  Uninstall
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InstalledApps;
