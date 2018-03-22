const axios = require('axios');

const parseFollowers = (data) => {
  console.log(data.length);
  data.forEach((obj) => {
    console.log(obj.login, obj.avatar_url);
  });
};

// limit is 100 followers per request
const fetchFollowers = (username, num) => {
  axios.get(`https://api.github.com/users/${username}/followers?page=${num}`)
    .then(res => parseFollowers(res.data))
    .catch(err => console.log(err));
};

fetchFollowers('StephenGrider', 1);
fetchFollowers('StephenGrider', 2);
