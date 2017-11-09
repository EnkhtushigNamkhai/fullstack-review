const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  console.log('GOES TO GETREPOSBYUSERNAME');
  
  let options = {
    url: 'https://api.github.com/users/' + username +'/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedBody = JSON.parse(body);
      console.log('no errors successful request!');
      //post to database each of the repos
      db.save(parsedBody);
    } else {
      console.log('ERROR in GITHUB request');
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;