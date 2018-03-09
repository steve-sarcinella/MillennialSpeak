require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const _ = require('lodash');

import * as commandProcessors from './command_processors';

const cmdProcessorMap = _.chain(commandProcessors).keyBy('cmd').mapValues('run').value();
console.log(cmdProcessorMap);

//parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, SLACK_API_TOKEN, SLACK_VERIFICATION_TOKEN } = process.env;

app.get('/', (req, res) => {
  res.send('<h2>MillennialSpeak</h2><p>This app pairs best with slack</p>');
});

//Message processing
const POST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SLACK_API_TOKEN}`,
  }
};



app.post('/millennialspeak', (req, res) => {
  console.log(`${req.command} called: ' + JSON.stringify(req.body)`);
  res.status(200).end();

  const message = JSON.stringify({
    token: SLACK_API_TOKEN,
    as_user: true,
    channel: req.body.channel_id,
    text: cmdProcessorMap[req.command](req.text)
  });

  console.log('Chat post message: ' + message);

  axios.post('https://slack.com/api/chat.postMessage', chatPostMessageData, postConfig)
  .then(res => {
    console.log('Response Received: ' + JSON.stringify(res.body));
  }).catch(err => {
    console.log('Error performing HTTP Post:' + err);
  });
});

const server = app.listen(process.env.PORT, () => console.log(`Speak listening on port ${process.env.PORT}`));

exports.closeServer = (callback) => {
  server.close(callback);
};
