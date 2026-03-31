import { useEffect, useState } from "react";
import download from "../../assets/assets/icon-downloads.png";

const InstalledApps = () => {
  const [apps, setApps] = useState([]);
  const [sortType, setSortType] = useState("");
  const [toast, setToast] = useState("");
  const formatDownloads = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("installedApps")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setApps(stored);
  }, []);

  const handleUninstall = (id, title) => {
    const updated = apps.filter((a) => a.id !== id);
    setApps(updated);
    localStorage.setItem("installedApps", JSON.stringify(updated));

    // show toast
    setToast(`${title} uninstalled successfully`);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  // sorting
  let sortedApps = [...apps];

  if (sortType === "rating") {
    sortedApps.sort((a, b) => b.ratingAvg - a.ratingAvg);
  } else if (sortType === "size") {
    sortedApps.sort((a, b) => parseInt(a.size) - parseInt(b.size));
  }

  return (
    <div className="px-10 py-10">
      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Top */}
      <div className="text-center">
        <h2 className="text-4xl font-bold ">Your Installed Apps</h2>
        <p className="mt-4">
          Explore all trending apps on market developed by us
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <select
          className="border px-2 py-1 text-black bg-white font-bold"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="size">Size</option>
        </select>
      </div>

      {/* List */}
      {sortedApps.length === 0 ? (
        <p>No apps installed</p>
      ) : (
        <div className="grid grid-cols-1  gap-6">
          {sortedApps.map((app) => (
            <div
              key={app.id}
              className="bg-base-200 p-4 rounded shadow flex justify-between items-center"
            >
              {/* Left side */}
              <div className="flex items-center gap-4">
                <img
                  src={app.image}
                  className="w-30 h-30 object-cover rounded "
                />
              </div>
              <div>
                <div className="mr-200">
                  <h3 className="font-semibold">{app.title}</h3>
                </div>
                <div className="flex gap-4">
                  {" "}
                  <img src={download} alt="Downloads" className="w-5" />(
                  {formatDownloads(app.downloads)})
                  <span> ⭐{app.ratingAvg}</span>
                  <span>{app.size} MB</span>
                </div>
              </div>

              {/* Right side button */}
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
  );
};

export default InstalledApps;
