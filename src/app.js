require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const _ = require('lodash');

//parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, SLACK_API_TOKEN, SLACK_VERIFICATION_TOKEN } = process.env;

const messagesProcessQueue = [];
function queueMessage(requestBody) {
  messagesProcessQueue.push(requestBody);
}

function handleMessage(messageBody) {
  if (_.startsWith(messageBody.event.body, '/thiccify')) {


    message.channel = messageBody.event.channel;
    const sendMessage = axios.post('https://slack.com/api/chat.postMessage', JSON.stringify(message));
    sendMessage.then(postResult);
  } else {
    console.log('No handlers registered for that message!');
  }
}

function runEventLoop() {
  console.log('Running event loop');
  while(messagesProcessQueue.length) {
    messageBody = messagesProcessQueue.unshift();
    handleMessage(messageBody);
  }
}

//Define event route
app.post('/slack_events', (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      res.send({ challenge: req.body.challenge });
      break;
    }
    case 'event_callback': {
      if (req.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
        res.sendStatus(200);
        handleMessage(req.body);

      }
      if (req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
        res.sendStatus(500);
        break;
      }

      console.log(`Processing message: ${req.body}`);

      res.sendStatus(200);
    }

    default: { res.sendStatus(500); }
  }
});

//Define routes
app.get('/', (req, res) => {
  res.send('<h2>MillennialSpeak</h2><p>This app pairs best with slack</p>');
});

app.post('/thiccify', (req, res) => {
  console.log('Thiccify called: ' + JSON.stringify(req.body));
  res.status(200).end();

  //Possible other fields
  // response_type: 'in_channel',
  //   link_names: true,

  const postConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SLACK_API_TOKEN}`,
    }
  };

  let chatPostMessageData = JSON.stringify({
    token: SLACK_API_TOKEN,
    as_user: true,
    channel: req.body.channel_id,
    text: 'Echo' + req.body.text + ' from ' + req.body.command
  });

  console.log('Chat post message: ' + chatPostMessageData);

  axios.post('https://slack.com/api/chat.postMessage', chatPostMessageData, postConfig)
  .then(res => {
    console.log('Response Received: ' + JSON.stringify(res.body));
  }).catch(err => {
    console.log('Error performing HTTP Post:' + err);
  });
});

app.listen(process.env.PORT, () => console.log(`Speak listening on port ${process.env.PORT}`));
