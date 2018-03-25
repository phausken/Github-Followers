import React from 'react';
import {fetchUser, fetchFollowers} from './util';
import UserList from './userlist';
import Header from './header';

class App extends React.Component {
  constructor(){
    super();

    this.state = ({
      num: 1,
      input: '',
      username: '',
      numFollow: '',
      followers: []
    });

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }

  handleInput(e){
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit(e){
    if(this.state.username !== this.state.input){
      e.preventDefault();
      fetchUser(this.state.input)
        .then((res) => {
          this.setState({
            username: res.username,
            numFollow: res.numFollow,
            followers: res.followers,
            num: 2,
            status: res.status,
            input: ""
          });
        });
    }
  }

  handleMore(e){
    e.preventDefault();
    fetchFollowers(this.state.username, this.state.num)
      .then((res) => {
        this.setState({
          followers: (this.state.followers.concat(res)),
          num: this.state.num + 1
        });
      });
  }

  render(){
    const username = this.state.username;
    const followers = this.state.followers;
    const numFollow = this.state.numFollow;
    return (
      <div className="app">
        <div className="search">
        <input value={this.state.input} onChange= { this.handleInput }/>
        <button onClick={ this.handleSubmit }>Submit</button>
        </div>
        <Header username={ this.state.username } numFollow = { this.state.numFollow}/>
        <UserList users={ this.state.followers }/>
        { numFollow > followers.length && <button className="fetch" onClick={ this.handleMore }>Fetch More Users</button>  }
      </div>
    );
  }
}

export default App;
