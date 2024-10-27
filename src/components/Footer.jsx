import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2">
      <div className="container text-center">
        <small>
          &copy; {new Date().getFullYear()} World Happiness Prediction
        </small>
      </div>
    </footer>
  );
};

export default Footer;
