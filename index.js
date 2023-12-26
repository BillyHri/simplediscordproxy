app.post('/test123', (req, res) => {
    // Get the 'webhook' query parameter
    const webhookParam = req.query.webhook;
  
    // Store 'webhookParam' as a string (you can store it wherever you need)
    // For example, you can log it to the console
    console.log('Webhook Parameter:', webhookParam);
  
    // Read the JSON body contents
    const jsonBody = req.body;
  
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
  
  fetch("https://discord.com/api/webhooks/1189159272232275998/2PnUa6pkXUtAcHoLhl2W_STkrdNZiJhs1lX866xHylMHoBM1bnVi2jO8zdsnA3yh7QgF", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  
    // Send a response
    res.send('Received the request successfully!');
  });