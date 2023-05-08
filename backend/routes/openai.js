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
        prompt: `You are a console terminal. Message will contain a name of a crop, response should be the explaination about the farming practices of that crop in detail.
        User: ${icrop}`,
        max_tokens: 1000,
        temperature: 0,
    });

    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({ message: response.data.choices[0].text })
    }
})

module.exports = app;