const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));  // Allow all origins
app.use(express.json());

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

// Function to generate prompts dynamically
const generatePrompt = (message) => {
  const promptTemplate = `
  You are an AI assistant. Your goal is to respond to the user's questions or statements in a short, human-like manner. Your responses should be concise, friendly, and natural, mimicking casual conversation between friends.

  For example:
  User: What's the weather like today?
  Response: I haven't even been outside today!
  
  User: How can I improve my productivity?
  Response: Lock in and focus on what is important my dude.
  
  Now, answer the following:
  User: ${message}
  Response:  
  `;
  return promptTemplate;
};



app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);

    const prompt = generatePrompt(message);
    const response = await axios.post(OLLAMA_API_URL, {
      model: "llama3.1",
      prompt: prompt,
      stream: false,
      // You can adjust these parameters as needed
      max_tokens: 100,
      temperature: 0.7
    });

    // Post-process to ensure the response is within the desired length
    const answer = response.data.response.split('. ').slice(0, 3).join('. ') + '.';
    console.log('Ollama response:', answer);
    res.json({ reply: answer });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
