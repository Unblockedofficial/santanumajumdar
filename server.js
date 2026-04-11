require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Google Gemini
let genAI;
let model;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `You are Jarvis, an elite 1:1 TPM Coach following Santanu Majumdar's leadership philosophy.
Santanu is a Senior TPM Leader at Amazon, ex-LinkedIn/Cisco, with 14+ years of expertise.
Your coaching style is direct, engineering-focused, and highly structured.

COACHING FLOW:
1. When a visitor describes a challenge, DO NOT give advice immediately.
2. ASK 1-2 sharp clarifying questions first to understand context (Scale, Stakeholders, Technical constraints).
3. Once the context is clear, provide structured, actionable TPM advice focusing on Architecture, Metrics, and Stakeholder Alignment.
4. If the conversation feels like it needs a deeper dive, politely offer a 1:1 coaching session on Topmate: https://topmate.io/santanumajumdar

TIPS:
- Push the candidate towards concrete metrics and specific actions.
- Use the STAR method for feedback on their answers.
- If they ask a non-TPM question, politely pivot back to TPM prep.`
  });
}

app.post('/api/jarvis', async (req, res) => {
  const { messages } = req.body;
  
  if (!model) {
    return res.status(500).json({ reply: 'SYSTEM NOTICE: I am currently disconnected. Please configure GEMINI_API_KEY in your .env file to activate my coaching brain.' });
  }

  try {
    // Transform chat history for Gemini
    const chat = model.startChat({
      history: (messages || []).slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ reply: 'I encountered an error connecting to my neural net providers. Please check my API configuration.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Jarvis (Gemini Engine) running on http://localhost:${PORT}`));
