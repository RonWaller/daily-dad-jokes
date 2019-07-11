let axios = require('axios');
let express = require('express');
let path = require('path');
require('dotenv').config();

let app = express();

// PORT environment variable
let port = process.env.PORT || 3000;

// Server listening to PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

var config = {
  headers: { Accept: 'application/json' }
};

// Get Dad Joke ID
async function getDadJoke() {
  const response = await axios.get('https://icanhazdadjoke.com', config);
  const { data } = response;
  const joke = data.joke;
  console.log(typeof 'joke');
  console.log(joke.length);
  if (joke.length > 270) {
    getDadJoke();
  } else {
    return data.joke;
  }
}

// async function postTweet(joke) {
//   const response = await axios.get(
//     `https://icanhazdadjoke.com/j/${id}.png`,
//     config
//   );
//   const { data } = response;
//   return data;
// }

getDadJoke()
  .then(joke => {
    console.log(joke);
    // return postTweet(joke);
  })
  // .then(res => console.log(res))
  .catch(err => console(err));
