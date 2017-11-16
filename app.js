const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const WebClient = require('@slack/client').WebClient;
const thiccener = require('./src/thiccener');

const TOKEN = process.env.SLACK_API_TOKEN || 'test';
const PORT = process.env.PORT || 5000;

const app = new express();
app.use(bodyParser.urlencoded({extended:true}));

if (!TOKEN) {
  console.error('mising environment variable SLACK_API_TOKEN');
  process.exit(1);
}

app.post('/thicc', (req, res) => {
  let web = new WebClient(req.body.token);
  web.chat.postMessage({
    channel: req.body.channel,
    token: req.body.token,
    text: thiccener.thiccen(req.body.text),
    as_user: true
  }, (err, res) => {
      if (err) {
          console.log('Error:', err);
      } else {
          console.log('Message sent: ', res);
      }
  });


  let thiccened = thiccener.thiccen(req.body.text);
  res.send({
    response_type: 'in_channel',
    text: thiccened
  });
});

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
})
