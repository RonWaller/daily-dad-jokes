let axios = require('axios');
// let express = require('express');
// let path = require('path');
let Twit = require('twit');
// require('dotenv').config();

// let app = express();

// PORT environment variable
// let port = process.env.PORT || 3000;

// Server listening to PORT
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var config = {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'My Library (https://github.com/RonWaller/daily-dad-jokes)'
  }
};

// Get Dad Joke ID
async function getDadJoke() {
  const response = await axios.get('https://icanhazdadjoke.com', config);
  const { data } = response;
  const joke = data.joke;
  if (joke.length > 270) {
    getDadJoke();
  } else {
    return data.joke;
  }
}

async function postTweet(joke) {
  let status = {
    status: `${joke} #dailydadjoke #dadjoke`
  };
  const response = await T.post('statuses/update', status, err =>
    console.log(err || 'Tweet Posted')
  );

  return response;
}

getDadJoke()
  .then(joke => {
    console.log(joke);
    return postTweet(joke);
  })
  .then(res => console.log(res))
  .catch(err => console(err));
// setInterval(() => {
//   let hour = new Date().getHours();
//   if (hour = 12) {

//   }
// }, 1000 * 60 * 60 * 24);
