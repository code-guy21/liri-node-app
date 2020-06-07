const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");

let spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
  case "concert-this":
    console.log("concert this");
    break;
  case "spotify-this-song":
    console.log("spotify");
    break;
  case "movie-this":
    console.log("movie this");
    break;
  case "do-what-it-says":
    console.log("do what it says");
    break;
  default:
    console.log("invalid command");
}
