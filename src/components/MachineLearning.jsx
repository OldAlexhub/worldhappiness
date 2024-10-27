import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MachineLearning = () => {
  return (
    <div className="w-100">
      <iframe
        src="/data.nb.html" // Load directly from the public directory
        title="Machine Learning Analysis"
        style={{
          border: "none",
          height: "100vh", // Full viewport height
          width: "100vw", // Full viewport width
        }}
      />
    </div>
  );
};

export default MachineLearning;
