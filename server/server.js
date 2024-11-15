import express from "express";
import cors from "cors";
import axios  from "axios";
const app = express();
app.use(express.json());
app.use(cors());

app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/predict', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 