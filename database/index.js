const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoUrl: { type: String, unique: true },
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // This function should save a repo or repos to the MongoDB
  for (var i = 0; i < repos.length; i++) {
    var repoObj = repos[i]
    var userName = repoObj.owner.login;
    var repoURL = repoObj.html_url;
    var numForks = repoObj.forks;
    var str = 'username: ' + userName + ', repoURL: ' + repoURL +', numForks: ' + numForks + '\n';
    console.log(str);

    var repoInstance = new Repo({username: userName, repoUrl: repoURL, forks:numForks});
    
    repoInstance.save(function (err, repoInstance) {
      if (err) {
        console.log('HERE IS YOUR ERROR: ', err);
      };
    });
  }
  callback();
}

//querying the database
let getTopRepos = (callback) => {
  console.log('goes to GETTOPREPOS');

  Repo.
  find().
  limit(25).
  sort({ forks: -1 }).
  select('username repoUrl forks').
  exec(function (err, repos) {
    if (err) {
      // console.log('Error in retrieving');
      callback(err, null)
    } else {
      // console.log('GOT THE REPOS!!!', repos);
      callback(null, repos);
    }
  });
}

module.exports.getTopRepos = getTopRepos;
module.exports.save = save;