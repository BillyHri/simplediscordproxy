const express = require("express")
const app = express()
app.use(express.json());
require('dotenv').config()

const importData = require("./data.json")

let port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hey, you're currently on my discord proxy. If you somehow manage to figure out the APIKey, just use it for free mate. note to myself though, is that my heroku expires in 2024 so get on that mate.")
})

app.get("/apiData", (req, res) => {
    res.send(importData)
})

app.listen(port, () => {
    console.log(`proxy is listening on this port: ${3000}`)
})

const localAPIKey = "CCvPvuWlOH_TPT"

app.post('/', async (req, res) => {
    // Get the 'webhook' query parameter
    const webhookParam = req.query.webhook;
    const jsonBody = req.body.content;
    const givenAPIKey = req.body.key;

    if (process.env.APIKey != givenAPIKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }

   // if ((await fetch(webhookParam)).status != 200) {
   //     return res.status(401).json({ error: "Invalid discord webhook. This proxy is currently only being used for discord.com based webhooks." });
   //  }

 var requestOptions = {
    method: 'POST',
    headers: {
  "Content-Type": "application/json"
  },
    body: JSON.stringify({
    "content": jsonBody
  }),
    redirect: 'follow'
  };
  
  fetch(`${webhookParam}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  
    // Send a response
    res.send('Received the request successfully!');
  });