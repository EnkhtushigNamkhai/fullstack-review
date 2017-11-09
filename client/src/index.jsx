import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    //term is the username that we want to search
    //so want to make a post request to the server saying I want this username repo
    console.log(`${term} WAS SEARCHED`);
    var obj = {
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.log(' Aw there was an error :/ ');
      }
    };
    $.ajax(obj);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));