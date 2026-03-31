import React from "react";
import HeroImage from "../../assets/assets/hero.png";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStoreIos } from "react-icons/fa";
import Gradient from "../../assets/assets/gradient.jpg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div>
      <div>
        <h2 className="text-6xl font-bold text-center mt-10">
          We Build <br />
          <span className="text-purple-500">Productive</span> Apps
        </h2>
        <p className="text-center mt-5">
          At App-Doctor, we craft innovative apps designed to make everyday life
          simpler, smarter, and more exciting.<br></br> Our goal is to turn your
          ideas into digital experiences that truly make an impact.
        </p>
      </div>

      <div className="text-center mt-10 ">
        <button className="btn btn-neutral btn-outline text-white m-2 bg-mauve-800">
          <IoLogoGooglePlaystore />
          <Link
            to="https://play.google.com/store/apps?hl=en&pli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play
          </Link>
        </button>
        <button className="btn btn-neutral btn-outline text-white m-2 bg-mauve-800">
          <FaAppStoreIos />
          <Link
            to="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </Link>
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <img src={HeroImage} alt="Hero Image" />
      </div>

      <div>
        <img src={Gradient} alt="Gradient Background" />
      </div>
    </div>
  );
};

export default Hero;
