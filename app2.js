//AUTH
app.get('/auth', (req, res) => {
    res.sendFile(__dirname + '/add_to_slack.html');
});

app.get('/auth/redirect', (req, res) =>{
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
        +req.query.code+
        '&client_id='+process.env.CLIENT_ID+
        '&client_secret='+process.env.CLIENT_SECRET+
        '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
    var JSONresponse = JSON.parse(body)
    if (!JSONresponse.ok){
        console.log(JSONresponse)
        res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
    }else{
        console.log(JSONresponse)
        res.send("Success!")
    }
})
})

// const SlackClient = require('@slack/client');
// var client = new SlackClient.WebClient(BOT_ACCESS_TOKEN);
// var rtm = new SlackClient.RtmClient(BOT_ACCESS_TOKEN);
//
// // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
// rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
//   for (const c of rtmStartData.channels) {
// 	  if (c.is_member && c.name ==='general') { channel = c.id }
//   }
//   console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
// });
//
// // you need to wait for the client to fully connect before you can send messages
// rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
//   rtm.sendMessage("Hello!", channel);
// });
//
// rtm.on(SlackClient.RTM_EVENTS.MESSAGE, message => {
//     client.chat.postMessage(message.channel, 'Hello', { attachments: myAttachments, as_user: true });
// });
//
// rtm.start();



//
// let web = new WebClient(req.body.token);
// web.chat.postMessage({
//
//
//
// let thiccened = thiccener.thiccen(req.body.text);
// res.send({
//   response_type: 'in_channel',
//   text: thiccened
// });
// });
