const express = require("express");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

//
app.post("/greet/:firstname/:lastname?salute=hello", (req, res) => {
  const { firstname, lastname } = req.params;
  const { salute } = req.query;
  const { message } = req.body;

  res.send({
    greet: `${salute} ${firstname} ${lastname}, ${message}!`
  });
});



// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = server;
