require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const _ = require('lodash');

//Env vars
const { PORT, SLACK_API_TOKEN, SLACK_VERIFICATION_TOKEN } = process.env;

//Gather up all available commands
const commandProcessors = require('./command_processors');
const commands = _.chain(commandProcessors).keyBy('cmd').mapValues('run').value();
console.log(`Commands registered: ${_.keysIn(commands)}`);

//parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//in case someone hits the heroku instance
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
  console.log(`${req.body.command} called: ${JSON.stringify(req.body)}`);
  res.status(200).end();

  let cmdProcessor = commands[req.body.command];

  if (!cmdProcessor) {
    console.log(`Command [${req.body.command}] is not valid!`);
    res.status(400).end();
    return;
  }

  const message = JSON.stringify({
    token: SLACK_API_TOKEN,
    as_user: true,
    channel: req.body.channel_id,
    text: cmdProcessor(req.body.text)
  });

  console.log('Chat post message: ' + message);

  axios.post('https://slack.com/api/chat.postMessage', message, POST_CONFIG)
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
