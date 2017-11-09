import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [] 
    }
    this.databaseEmpty = false;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('nextProps ', nextProps);
    console.log('nextState ', nextState);
  }

  componentWillMount() {
    console.log('componentWillMount called');

    this.fetch(function(data) {
      console.log('got data from server', data);
      if (data.length === 0) {
        console.log('first time dabase is clear');
        this.databaseEmpty = true;
        this.setState({repos: []});
      } else {
        this.setState({repos: data});
      }
    }.bind(this));

    // var obj = {
    //   type: 'GET',
    //   url: 'http://localhost:1128/repos',
    //   success: function(data) {
    //     console.log('got data from server', data);

    //     if (data.length === 0) {
    //       console.log('first time dabase is clear');
    //       this.databaseEmpty = true;
    //       this.setState({repos: []});
    //     } else {
    //       this.setState({repos: data});
    //     }
    //   }.bind(this),
    //   error: function(err) {
    //     console.log(' Aw there was an errorrrrr :/ ');
    //   }
    // };

    // $.ajax(obj);
  }

  fetch (callback) {

    var obj = {
      type: 'GET',
      url: 'http://localhost:1128/repos',
      success: function(data) {
        callback(data);
      },
      error: function(err) {
        console.log(' Aw there was an errorrrrr :/ ');
      }
    };
    $.ajax(obj);

  }

  search (term) {
    //term is the username that we want to search
    //so want to make a post request to the server saying I want this username repo
    //console.log()
    console.log(`${term} WAS SEARCHED`);

    //refresh automatically 

    var obj = {
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        this.databaseEmpty = false;
        //call get to the server after the post?
        this.fetch(function(data) {
          console.log('setting state HERE');
          this.setState({repos: data});
        }.bind(this));
        
      }.bind(this),
      error: function(err) {
        console.log(' Aw there was an error :/ ');
      }
    };
    $.ajax(obj);

  }

  render () {
    console.log('render called');
    //when it's first starting
    if (this.state.repos.length === 0 && !this.databaseEmpty) {
      //first load
      console.log('first loadddd');
      return null;
    } else if (this.state.repos.length === 0 && this.databaseEmpty) {
      console.log('emptyyyy');
      return <div><h1>Github Fetcher</h1><p>You currently have not fetched anyone</p><Search onSearch={this.search.bind(this)}/></div>;

    }  else {
      return (<div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} class='reposList'/>
        <Search onSearch={this.search.bind(this)}/>
      </div>)
      
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));