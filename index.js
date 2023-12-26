const express = require("express")
const app = express()
app.use(express.json());
require('dotenv').config()

const importData = require("./data.json")

let port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello, World! V6")
})

app.get("/apiData", (req, res) => {
    res.send(importData)
})

app.listen(port, () => {
    console.log(`proxy is listening on this port: ${3000}`)
})

const localAPIKey = "CCvPvuWlOH_TPT"

app.post('/', (req, res) => {
    // Get the 'webhook' query parameter
    const webhookParam = req.query.webhook;
    const givenAPIKey = req.query.key;

    // Store 'webhookParam' as a string (you can store it wherever you need)
    // For example, you can log it to the console
    console.log('Webhook Parameter:', webhookParam);
  
    // Read the JSON body contents
    const jsonBody = req.body.content;
    const givenAPIKey1 = req.body.key;
  
    if (process.env.APIKey != JSON.stringify(givenAPIKey)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Do something with the JSON data (you can store it, process it, etc.)
    // For example, log it to the console
    console.log('JSON Body:', jsonBody);
  
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