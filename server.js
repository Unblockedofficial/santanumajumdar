require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

app.post('/api/jarvis', async (req, res) => {
  const { messages } = req.body;
  
  if (!openai) {
    return res.status(500).json({ reply: 'SYSTEM NOTICE: I cannot connect to my brain. Please configure your OPENAI_API_KEY in the `.env` file.' });
  }

  const systemPrompt = `You are Jarvis, an elite Technical Program Management (TPM) Coach created by Santanu Majumdar. 
You speak directly, clearly, and with extreme FAANG expertise. Your goal is to coach the candidate to use the STAR method, identify gaps in their answers regarding stakeholder alignment, architecture, and metrics.
If they ask a non-TPM question, politely pivot back to TPM prep. Keep your responses crisp, extremely insightful, direct, and conversational. Always try to push the candidate towards concrete metrics and specific actions.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...(messages || [])
      ],
      temperature: 0.7,
      max_tokens: 400
    });
    
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ reply: 'I encountered an error connecting to my neural net providers. Please try again later.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TPM Coach running on http://localhost:${PORT}`));
