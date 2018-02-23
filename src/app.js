require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request');
const slackEvents = require('slack-events-listener')(process.env.SLACK_VERIFICATION_TOKEN, onSlackEvent);

const BOT_ACCESS_TOKEN = process.env.SLACK_API_TOKEN || 'test';
const PORT = process.env.PORT || 5000;

//Local Tunnel for testing
if (process.env.LOCAL_DEV) {
  const lt = require('localtunnel');
  const tunnel = lt(PORT, (err, tunnel) => {
    if (err) {
      console.log('Local tunnel wanted for dev, but failed: ' + err);
      process.exit();
    }

    console.log(`Local Tunnel is up and running at url: ${tunnel.url}`);
  });

  tunnel.on('close', () => {
    console.log('Local Tunnel is closing url: ${localtunnel.url}');
  });
}


// if (!TOKEN) {
//     console.error('mising environment variable SLACK_API_TOKEN');
//     process.exit(1);
// }

function onSlackEvent(event, cb) {
  // do something. call cb with err if you want Slack to resend the message (your database might be down)
  // writeToDatabase(event, cb);
  console.log(event);
  console.log(cb);
}

// /slack_events should match whatever webhook you set in Slack
app.use('/slack_events', bodyParser.json(), slackEvents);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/thiccify', (req, res) => res.send('NOT IMPLEMENTED'));

app.listen(PORT, () => console.log('Speak listening on port ' + PORT));

// request.get('https://slack.com/api/rtm.connect', {}, (err, res, body) => {
//   // console.log(err);
//   // console.log(res);
//   console.log(body);
// });
