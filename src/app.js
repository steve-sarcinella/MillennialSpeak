const express = require('express')
const bodyParser = require('body-parser')
const thiccener = require('./thiccener');

var TOKEN = process.env.SLACK_API_TOKEN || 'test';

const app = new express();
app.use(bodyParser.urlencoded({extended:true}));

if (!TOKEN) {
  console.error('mising environment variable SLACK_API_TOKEN');
  process.exit(1);
}

app.get('/', (req, res) => {
  console.log(`incoming request: ${req.body}`);
})

app.get('/thicc', (request, response) => {
  console.log(thiccener.thicc(request.body.text, 1));
});

app.listen(5000, () => {
  console.log(`Server started at localhost:${5000}`);
})
