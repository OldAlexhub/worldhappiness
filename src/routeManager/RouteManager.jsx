import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Machine from "../routes/Machine";
import Prediction from "../routes/Prediction";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="machine" element={<Machine />} />
          <Route path="predict" element={<Prediction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
