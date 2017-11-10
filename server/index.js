const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

//app.use('/repos', express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.redirect('/repos');
// });

app.post('/repos', function (req, res) {
  console.log('making a post request to server');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  

  var username = req.body.username;
  console.log(username);

  //make a get request to the GitHUb API here
  helpers.getReposByUsername(username, res);
  //res.end('YAY, Posted to Database!');
});

//HAVE A FUNCTION HERE THAT RECIEVES WHEN THE POST

app.get('/repos', function (req, res) {
  console.log('making a get request to server');
  // This route should send back the top 25 repos
  //query the database, sort by the fork and return the top 25

  db.getTopRepos(function(err, data) {
    res.send(data);
  });


  //how can I make the repos array be filled with my data?
  //res.status(200).send();
  
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

