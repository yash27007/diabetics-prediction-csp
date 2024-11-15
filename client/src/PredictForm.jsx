import { useState } from "react";
import axios from "axios";
import "./PredictionForm.css";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    glucose: "",
    insulin: "",
    blood_pressure: "",
    cholesterol: "",
    smoking_status: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("An error occurred. Please try again!");
    }
  };

  return (
    <div className="prediction-form-container">
      <h1>Diabetes Prediction</h1>
      <form onSubmit={handleSubmit} className="prediction-form">
        <label>
          Age:
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          BMI:
          <input
            type="number"
            step="0.1"
            name="bmi"
            placeholder="Enter your BMI"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Glucose Level:
          <input
            type="number"
            name="glucose"
            placeholder="Enter glucose level"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Insulin Level:
          <input
            type="number"
            name="insulin"
            placeholder="Enter insulin level"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Blood Pressure:
          <input
            type="number"
            name="blood_pressure"
            placeholder="Enter blood pressure"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cholesterol Level:
          <input
            type="number"
            name="cholesterol"
            placeholder="Enter cholesterol level"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Smoking Status (0 for Non-Smoker, 1 for Smoker):
          <input
            type="number"
            name="smoking_status"
            placeholder="Enter 0 or 1"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Get Prediction</button>
      </form>
      {prediction !== null && (
        <div className="prediction-result">
          <h2>Prediction Result</h2>
          <p>{prediction === 1 ? "There is a high chance of you being diabetic" : "There is a low chance of you being diabetic"}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
