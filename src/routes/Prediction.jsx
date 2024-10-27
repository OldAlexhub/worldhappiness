import React, { useState } from "react";
import axios from "axios";
import logo from "../images/lods.webp";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, // Register category scale for the x-axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Croatia",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan Province of China",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Türkiye",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Prediction = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [forecastData, setForecastData] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PYTHON_ONE}/predict`,
        {
          country: selectedCountry,
        }
      );
      setForecastData(response.data.forecasts); // Save forecast data
    } catch (error) {
      console.error("Error submitting data:", error);
      setForecastData(null);
    }
  };

  // Prepare data for charts
  const prepareChartData = (label) => {
    return {
      labels: forecastData.map((item) => new Date(item.ds).getFullYear()), // Extract year
      datasets: [
        {
          label: label.replace("_", " "),
          data: forecastData.map((item) => item[label]),
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
          tension: 0.2,
        },
      ],
    };
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="logo"
          style={{ width: "100px", borderRadius: "15px" }}
        />
        <h2 className="mt-3">Happiness Prediction for Your Selected Country</h2>
        <p className="text-muted">
          Choose a country to see predictive insights on various happiness
          indicators, including economic stability, social support, health
          expectancy, freedom of choice, generosity, and perceptions of
          corruption. Each indicator reflects trends and shifts over time,
          offering a glimpse into the well-being landscape of your selected
          country.
        </p>
      </div>
      <form className="row justify-content-center" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <select
            className="form-select mb-3"
            value={selectedCountry}
            onChange={handleSelectChange}
            required
          >
            <option value="" disabled>
              Select a Country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 text-center">
          <button type="submit" className="btn btn-primary w-100">
            Get Prediction
          </button>
        </div>
      </form>

      {/* Render Charts if Data is Available */}
      {forecastData && (
        <div className="mt-5">
          <h3 className="text-center mb-4">
            Predicted Happiness Indicators Over Time
          </h3>
          <div className="row">
            {[
              "Life_Ladder",
              "Log_GDP_per_capita",
              "Social_support",
              "Healthy_life_expectancy_at_birth",
              "Freedom_to_make_life_choices",
              "Generosity",
              "Perceptions_of_corruption",
            ].map((indicator, index) => (
              <div key={index} className="col-md-6 mb-4">
                <Line
                  data={prepareChartData(indicator)}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prediction;
