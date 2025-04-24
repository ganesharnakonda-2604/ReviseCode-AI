const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Code review endpoint
app.post('/api/review-code', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }
    
    // Create prompt for Gemini API
    const prompt = `
You are a senior developer reviewing code. Analyze this ${language} code and provide detailed, constructive feedback in the following format:

1. Summary: Overall assessment in 1-2 sentences
2. Issues: List any bugs, errors, or potential problems
3. Performance: Identify any performance issues or inefficiencies
4. Best Practices: Highlight areas where code doesn't follow best practices
5. Suggestions: Provide specific recommendations for improvement

CODE TO REVIEW:
\`\`\`${language}
${code}
\`\`\`

Be thorough but constructive. For each issue or suggestion, explain why it matters.
`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to review code',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});