from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = tf.keras.models.load_model('csp.h5')

# Define the expected number of features for the model
EXPECTED_FEATURES = 7  # Update this based on your model

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get data from the POST request
        data = request.get_json()

        # Validate that the required features are present
        required_features = ["age", "bmi", "glucose", "insulin", "blood_pressure", "cholesterol", "smoking_status"]
        missing_features = [feature for feature in required_features if feature not in data]

        if missing_features:
            return jsonify({"error": f"Missing features: {', '.join(missing_features)}"}), 400

        # Extract and convert features to float
        input_data = np.array([[float(data[feature]) for feature in required_features]])

        # Step 1: Normalize the input data
        # Replace with actual min-max values from your training data
        min_values = np.array([0, 15, 70, 20, 60, 100, 0])  # Example: Replace with actual training data min values
        max_values = np.array([100, 40, 200, 200, 180, 300, 1])  # Example: Replace with actual training data max values

        input_data_normalized = (input_data - min_values) / (max_values - min_values)

        # Check for valid normalization
        if np.any(input_data_normalized < 0) or np.any(input_data_normalized > 1):
            return jsonify({"error": "Input values are out of range after normalization."}), 400

        # Step 2: Make prediction using the model
        prediction_prob = model.predict(input_data_normalized)
        # Convert prediction probabilities to binary (0 or 1)
        prediction = (prediction_prob > 0.5).astype(int).ravel()

        # Return the result as a JSON response
        return jsonify({"prediction": int(prediction[0])})
    
    except KeyError as ke:
        # Handle missing keys
        return jsonify({"error": f"Missing key in input data: {str(ke)}"}), 400

    except ValueError as ve:
        # Handle invalid data types
        return jsonify({"error": f"Invalid data value: {str(ve)}"}), 400

    except Exception as e:
        # Catch any other exceptions
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
