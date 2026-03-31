import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/logo.png";
import { FaGithub } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Header = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("installedApps")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(stored.length);
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-violet-500 font-bold border-b-2 border-violet-500"
              : "hover:text-violet-400"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apps"
          className={({ isActive }) =>
            isActive
              ? "text-violet-500 font-bold border-b-2 border-violet-500"
              : "hover:text-violet-400"
          }
        >
          Apps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/installation"
          className={({ isActive }) =>
            isActive
              ? "text-violet-500 font-bold border-b-2 border-violet-500"
              : "hover:text-violet-400"
          }
        >
          Installation
          {count > 0 && (
            <span className="badge badge-sm badge-primary ml-1">{count}</span>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-lg">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <div className="text-violet-400 font-semibold flex items-center gap-2 ml-2">
          <img className="w-7" src={logo} alt="logo" />
          <Link to="/">APP-DOCTOR</Link>
        </div>
      </div>

      {/* CENTER (Desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        <Link
          to="https://github.com/Towhidur-Rahmaan"
          target="_blank"
          className="btn bg-linear-to-r from-violet-700 to-violet-500 text-white"
        >
          <FaGithub />
          <span className="hidden sm:inline">Contribute</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
