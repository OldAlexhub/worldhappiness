import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} World Happiness Prediction Project
        </p>
        <p>
          Built with ❤️ by Mohamed Gad |{" "}
          <Link to="https://mohamedgad.com" className="text-light">
            mohamedgad.com
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
