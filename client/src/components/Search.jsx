import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(e) {
    console.log('setting it to empty');
    console.log('TERM : ', this.state.term);
    // document.getElementById();
    this.setState({term: ''}, function() {
      console.log('setting state is done');
      console.log('SET IS DONE: ', this.state.term)
    });
    this.props.onSearch(this.state.term);
    //clear the input field?
  }

  render() {
    {console.log('rendering')
    console.log('the actual value of term is empty', this.state.term)}
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;