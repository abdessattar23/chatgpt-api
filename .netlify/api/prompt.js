require('dotenv').config();
const openai = require('openai');
const express = require('express');

const app = express();

openai.api_key = process.env.OPENAI_API_KEY;

const model = 'gpt-3.5-turbo';
const temperature = 0.5;
const max_tokens =5000;

app.get('/prompt', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).send('Prompt is required');
  }

  try {
    const completions = await openai.completions.create({
      engine: model,
      prompt: prompt,
      temperature: temperature
      max_tokens: max_tokens
    });

    const text = completions.choices[0].text;
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating text');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
