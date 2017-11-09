const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  console.log('making a post request to server');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  

  var username = req.body.username;
  console.log(username);

  //make a get request to the GitHUb API here
  helpers.getReposByUsername(username);
  res.end('YAY, Posted to Database!');
});

app.get('/repos', function (req, res) {
  console.log('making a get request to server');
  // TODO - your code here!

  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

