const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const thiccener = require('./src/thiccener');

const TOKEN = process.env.SLACK_API_TOKEN || 'test';
const PORT = process.env.PORT || 5000;

const app = new express();
app.use(bodyParser.urlencoded({extended:true}));

if (!TOKEN) {
  console.error('mising environment variable SLACK_API_TOKEN');
  process.exit(1);
}

// app.get('/', (req, res) => {
//   console.log(`incoming request: ${req.body}`);
// })

app.post('/thicc', (req, res) => {
  // console.log(req.body);
  res.send(thiccener.thiccen(req.body.text));
});

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
})
