//This app used to use RESTful conventions. I've left util/util.js to demonstrate
//how it used to fetch data.

import React from "react";
//import { fetchUser, fetchFollowers } from "../util/util";
import UserList from "./userlist";
import UserProfile from "./UserProfile";
import Header from "./header";
import { ApolloConsumer } from "react-apollo";
import { fetchFollowers, fetchMoreFollowers } from "../util/query.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      //after is a string used by Github's API to aid in pagination
      after: "",
      input: "",
      name: "",
      avatar: "",
      username: "",
      numFollow: "",
      followers: [],
      hasNext: false,
      bio: "",
      error: false
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

  handleSubmit(client, e) {
    e.preventDefault();
    // Checks to see if user is already fetched
    if (this.state.username !== this.state.input) {
      client
        .query({
          query: fetchFollowers,
          variables: {
            username: this.state.input
          }
        })
        .then(res => {
          console.log(res);
          const { bio, followers, login, name, avatarUrl } = res.data.user;
          const { nodes, pageInfo, totalCount } = followers;

          this.setState({
            after: followers.pageInfo.endCursor,
            hasNext: followers.pageInfo.hasNextPage,
            name,
            avatar: avatarUrl,
            numFollow: followers.totalCount,
            followers: followers.nodes,
            username: login,
            bio,
            error: false
          });
        }).catch(err => this.setState({error: true}));
    }
  }

  handleMore(client) {
    const { after, username } = this.state;

    if (this.state.hasNext) {
      client
        .query({
          query: fetchMoreFollowers,
          variables: {
            username,
            after
          }
        })
        .then(res => {
          const { nodes, pageInfo } = res.data.user.followers;

          this.setState({
            followers: this.state.followers.concat(nodes),
            after: pageInfo.endCursor,
            hasNext: pageInfo.hasNextPage
          });
        });
    }
  }

  render() {
    const username = this.state.username;
    const followers = this.state.followers;
    const numFollow = this.state.numFollow;
    return (
      <ApolloConsumer>
        {client => (
          <div className="app">
            <form
              className="search"
              onSubmit={e => this.handleSubmit(client, e)}
            >
              <input
                className="search-bar"
                value={this.state.input}
                onChange={this.handleInput}
                placeholder="Enter a Github username"
              />
              <input type="submit" value="Submit" className="submit-button" />
              {numFollow > followers.length && (
                <button
                  className="submit-button"
                  onClick={() => this.handleMore(client)}
                >
                  Fetch More Users
                </button>
              )}
              {this.state.error && <p className="error">Username not found</p>}
            </form>
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
        )}
      </ApolloConsumer>
    );
  }
}

export default App;
