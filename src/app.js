require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request');

//parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const eventProcessingQueue = [];

//Define event route
app.post('/slack_events', (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      res.send({ challenge: req.body.challenge });
      break;
    }
    case 'event_callback': {
      if (req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
        res.sendStatus(500);
        break;
      }

      eventProcessingQueue.push(req.body.event);

      res.sendStatus(200);
    }

    default: { res.sendStatus(500); }
  }
});


//Define routes
app.get('/', (req, res) => {
  res.send('<h2>MillennialSpeak</h2><p>This app pairs best with slack</p>');
});

app.get('/thiccify', (req, res) => res.send('NOT IMPLEMENTED'));

app.listen(process.env.PORT, () => console.log(`Speak listening on port ${process.env.PORT}`));


function processEvents() {
  while(eventProcessingQueue.length) {
    let event = eventProcessingQueue.shift();
    console.log(`Event of type ${event.type} received`);
  }
}

//begin event loop
setTimeout(processEvents, 1000);
