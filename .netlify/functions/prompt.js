require('dotenv').config();
const axios = require('axios');

exports.handler = async (event, context) => {
const prompt = event.queryStringParameters.prompt;

const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPENAI_API_KEY;
const model = 'gpt-3.5-turbo';
const temperature = 0.5;
const max_tokens =5000;


try {
    const response = await axios.post(apiEndpoint, {
      prompt: prompt,
      model: model,
      temperature: temperature,
      max_tokens: max_tokens
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const text = response.data.choices[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(text),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: error.message,
    };
  }
};
