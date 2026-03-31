import React from "react";
import error from "../../assets/assets/error-404.png";
import { Link } from "react-router";
import Hero from "../Hero/Hero";
import Header from "../Header/Header";

const ErrorPage = () => {
  return (
    <div>
      <Header></Header>
      <div className="flex justify-center mt-20">
        <img src={error} alt="Error 404" />
      </div>
      <div className="text-center mt-30">
        <h2 className="text-4xl">Oops Page Not Found!</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go Back To Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
