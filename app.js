const express = require('express')
const bodyParser = require('body-parser')
const thiccener = require('./src/thiccener');

const TOKEN = process.env.SLACK_API_TOKEN || 'test';
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
})