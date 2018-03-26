const axios = require("axios");

const parseFollowers = data => {
  //Helper function that takes in a response from a 'followers get request'
  // grabs all the avatar URLs, and returns them in an array
  const results = [];
  data.forEach(obj => {
    results.push(obj.avatar_url);
  });

  return results;
};

// limit is 100 followers per request
const fetchFollowers = (username, num) => {
  //username and num are passed from App state. Passing num as a query allows
  //subsequent requests to fetch additional users beyond the initial 30
  return axios
    .get(`https://api.github.com/users/${username}/followers?page=${num}`)
    .then(res => parseFollowers(res.data))
    .catch(err => console.log(err));
};

const fetchUser = username => {
// The initial user 'get'. Since user info and user followers are 2 separate endpoints
// we need two separate requests. Bundles up data from both the user 'get' and the followers 'get'
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(userRes => {
      return fetchFollowers(username, 1).then(followerRes => {
        return {
          name: userRes.data.name,
          bio: userRes.data.bio,
          avatar: userRes.data.avatar_url,
          username: userRes.data.login,
          numFollow: userRes.data.followers,
          followers: followerRes,
          status: userRes.data.status
        };
      });
    })
    .catch(err => {
    //Error handling. If the request fails (a user doesn't exist), we send an empty object
    //with a status of 404
      return {
        username: "",
        numFollow: "",
        followers: [],
        status: err.response.status
      };
    });
};

module.exports = { fetchFollowers, fetchUser };
