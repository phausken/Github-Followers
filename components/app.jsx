import React from "react";
//util.js contains all ajax request functions
import { fetchUser, fetchFollowers } from "../util/util";
import UserList from "./userlist";
import UserProfile from "./UserProfile";
import Header from "./header";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      //num will be passed in the 'get' request to Github as query param
      num: 1,
      input: "",
      name: "",
      avatar: "",
      username: "",
      numFollow: "",
      followers: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }

  handleInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit(e) {
    // Checks to see if user is already fetched
    if (this.state.username !== this.state.input) {
      e.preventDefault();
      fetchUser(this.state.input).then(res => {
        if (res.status === 404) {
          this.setState({
            name: "User Not Found",
            bio: "",
            avatar: "",
            username: "",
            numFollow: "",
            followers: [],
            status: res.status,
            input: ""
          });
        } else {
          this.setState({
            name: res.name,
            bio: res.bio,
            avatar: res.avatar,
            username: res.username,
            numFollow: res.numFollow,
            followers: res.followers,
            num: 2,
            status: res.status,
            input: ""
          });
        }
      });
    }
  }

  handleMore(e) {
    e.preventDefault();
    fetchFollowers(this.state.username, this.state.num).then(res => {
      this.setState({
        // Add the new batch of followers to the existing array
        followers: this.state.followers.concat(res),
        // Increment num by 1 to account for subsequent requests
        num: this.state.num + 1
      });
    });
  }

  render() {
    const username = this.state.username;
    const followers = this.state.followers;
    const numFollow = this.state.numFollow;
    return (
      <div className="app">
        <div className="search">
          <input
            value={this.state.input}
            onChange={this.handleInput}
            placeholder="Enter a Github username"
          />
          <a onClick={this.handleSubmit}>Submit</a>
          {numFollow > followers.length && (
            <a className="fetch" onClick={this.handleMore}>
              Fetch More Users
            </a>
          )}
        </div>
        <div className="main">
          <UserProfile
            username={this.state.username}
            avatar={this.state.avatar}
            name={this.state.name}
            bio={this.state.bio}
          />
          <div className="head-list">
            <Header
              username={this.state.username}
              numFollow={this.state.numFollow}
              currentDisplay={this.state.followers.length}
            />
            <UserList users={this.state.followers} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
