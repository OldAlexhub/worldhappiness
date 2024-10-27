import React, { useState } from "react";
import logo from "../images/lods.webp";
import axios from "axios";

const Machine = () => {
  const [formData, setFormData] = useState({
    life_Ladder: "",
    Log_GDP_per_capita: "",
    Social_support: "",
    Healthy_life_expectancy_at_birth: "",
    Freedom_to_make_life_choices: "",
    Generosity: "",
    Perceptions_of_corruption: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      Social_support: formData.Social_support / 100,
      Healthy_life_expectancy_at_birth:
        formData.Healthy_life_expectancy_at_birth / 100,
      Freedom_to_make_life_choices: formData.Freedom_to_make_life_choices / 100,
      Generosity: formData.Generosity / 100,
      Perceptions_of_corruption: formData.Perceptions_of_corruption / 100,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PYTHON_ONE}/status`,
        dataToSend
      );
      const { message } = response.data;
      setResponseMessage(message);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img
          src={logo}
          alt="logo"
          style={{ borderRadius: "15px", width: "150px" }}
          className="mb-4"
        />
        <h2 className="mb-4">World Happiness Model Predictor</h2>
        <p className="text-muted mb-5">
          Enter data across key social, economic, and health metrics to receive
          an AI-powered assessment of happiness within a given context. This
          model analyzes these indicators to predict an approximate happiness
          rating, classifying the result into categories such as “Happy,”
          “Moderately Happy,” or “Unhappy.” This outcome reflects not only your
          data input but also aligns with worldwide trends observed in the World
          Happiness Report.
        </p>
      </div>
      <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label>Life Ladder (0 - 12)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 12"
            name="life_Ladder"
            value={formData.life_Ladder}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label>GDP per Capita (0 - 12)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 12"
            name="Log_GDP_per_capita"
            value={formData.Log_GDP_per_capita}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label>Social Support (0 - 100)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 100"
            name="Social_support"
            value={formData.Social_support}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label>Healthy Life Expectancy (0 - 100)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 100"
            name="Healthy_life_expectancy_at_birth"
            value={formData.Healthy_life_expectancy_at_birth}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label>Freedom of Choice (0 - 100)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 100"
            name="Freedom_to_make_life_choices"
            value={formData.Freedom_to_make_life_choices}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label>Generosity (0 - 100)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 100"
            name="Generosity"
            value={formData.Generosity}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label>Perceptions of Corruption (0 - 100)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter a number between 0 and 100"
            name="Perceptions_of_corruption"
            value={formData.Perceptions_of_corruption}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary w-50">
            Submit
          </button>
        </div>
      </form>
      {responseMessage && (
        <div className="alert alert-info mt-4" role="alert">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default Machine;
