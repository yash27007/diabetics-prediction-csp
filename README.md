# Diabetes Prediction App

This project consists of a **frontend** built using React and a **backend** built using Flask and Node.js. The app predicts whether a person is at risk for diabetes based on various input parameters.


## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (for running the React frontend)
- [Python](https://www.python.org/downloads/) (for running the Flask backend)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)
- [npm](https://www.npmjs.com/) (Node.js package manager)

### Install Dependencies

#### 1. **Frontend (React)**

Navigate to the `client` directory and install the necessary dependencies:

```bash
cd client
npm install
```

Once the dependencies are installed, you can run the frontend:

```bash
npm run dev
```

This will start the React development server, and you can access the frontend at `http://localhost:3000` in your browser.

#### 2. **Backend (Flask and Node.js)**

##### a) **Flask Backend**:

In the `server` folder, install the Python dependencies by running:

```bash
cd server
pip install -r requirements.txt
```

Make sure the `app.py` file is in the `server` folder. You can now run the Flask app:

```bash
python app.py
```

This will start the Flask server and listen on port `8000` by default.

##### b) **Node.js Backend**:

In the same `server` folder, if your Node.js server (`server.js`) is set up to handle requests, install the necessary dependencies:

```bash
cd server
npm install
```

Once installed, you can start the Node.js server:

```bash
node server.js
```

This will start the Node.js server.

### Running the Application

1. **Frontend**: After running `npm run dev` in the client folder, open your browser and go to `http://localhost:3000`. You will see the prediction form with fields for age, BMI, glucose level, and more.

2. **Backend**: You should have the Flask and Node.js servers running at the same time. The frontend will send POST requests to the Flask server (`http://localhost:8000/predict`).

3. **Make Predictions**: Once both the frontend and backend servers are up and running, you can fill out the form with details such as age, BMI, glucose level, and other relevant information. Upon form submission, the backend will process the data and return a prediction (positive or negative for diabetes).

## API Endpoint (Backend)

### POST `/predict`

This endpoint accepts the following JSON data:

```json
{
  "age": 45,
  "bmi": 25.5,
  "glucose": 140,
  "insulin": 80,
  "blood_pressure": 120,
  "cholesterol": 200,
  "smoking_status": 0
}
```

### Response:

```json
{
  "prediction": 1
}
```

- **1**: Positive (Risk for diabetes)
- **0**: Negative (No risk for diabetes)

## Project Overview

- The **frontend** is built with React to create a form that collects user data and displays the prediction result.
- The **backend** consists of two parts:
  - **Flask (app.py)**: Processes the form data and provides the prediction result.
  - **Node.js (server.js)**: Handles server-side logic for predictions.

## Troubleshooting

- Ensure both servers (Flask and Node.js) are running at the same time.
- Verify that the `client` is running on `localhost:3000` and the backend is available on `localhost:8000`.

