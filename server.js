const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));  // Allow all origins
app.use(express.json());

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);
    const response = await axios.post(OLLAMA_API_URL, {
      model: "llama3",
      prompt: message,
      stream: false
    });
    console.log('Ollama response:', response.data);
    res.json({ reply: response.data.response });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));