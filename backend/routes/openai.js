const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI;
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

const configuration = new Configuration({
    organization: "org-wB5BWYoiUqFenbWao9B797Jk",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post('/talk', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a console terminal. Answer as if you are getting commands from a user(who is a farmer).
        User: ${message}`,
        max_tokens: 500,
        temperature: 0,
    });

    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({ message: response.data.choices[0].text })
    }
})

app.post('/information', async (req, res) => {
    const { icrop } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a console terminal. Message will contain a name of a crop, answer should contain the essential information about crop(places where it grows, season in which it grows, best fertilizers/pesticides, best farming practices).
        User: ${icrop}`,
        max_tokens: 500,
        temperature: 0,
    });

    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({ message: response.data.choices[0].text })
    }
})

module.exports = app;