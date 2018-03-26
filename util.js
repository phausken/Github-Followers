const axios = require('axios');

const parseFollowers = (data) => {
  const results = [];
  data.forEach((obj) => {
    results.push(obj.avatar_url);
  });

  return results;
};

// limit is 100 followers per request
const fetchFollowers = (username, num) => {
  return axios.get(`https://api.github.com/users/${username}/followers?page=${num}`)
    .then(res => parseFollowers(res.data))
    .catch(err => console.log(err));
};

const fetchUser = (username) => {
  return axios.get(`https://api.github.com/users/${username}`)
    .then((userRes) => {
      return fetchFollowers(username, 1).
        then((followerRes) => {
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
     }).catch((err) => {
       return {
         username: "",
         numFollow: "",
         followers: [],
         status: err.response.status
       };
     });
};


module.exports = {fetchFollowers, fetchUser};
