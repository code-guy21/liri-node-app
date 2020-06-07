const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let query = process.argv.slice(3).join("+");

switch (command) {
  case "concert-this":
    fetchConcerts();
    break;
  case "spotify-this-song":
    fetchSong();
    break;
  case "movie-this":
    fetchMovie();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("invalid command");
}

function fetchConcerts() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=codingbootcamp"
    )
    .then((resp) => {
      renderConcerts(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderConcerts(concerts) {
  concerts.forEach((concert) => {
    console.log("Venue: " + concert.venue.name);
    console.log("Location: " + concert.venue.location);
    console.log(
      "Date: " + moment(concert.datetime).format("MM/DD/YYYY") + "\n"
    );
  });
}

function fetchSong() {
  console.log("fetch song");
}

function fetchMovie() {
  console.log("fetch movie");
}

function doWhatItSays() {
  console.log("do what it says");
}
