const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let query = process.argv.slice(3).join("+");

switch (command) {
  case "concert-this":
    fetchConcerts(query);
    break;
  case "spotify-this-song":
    fetchSongs(query);
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

function fetchConcerts(query) {
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

function fetchSongs(query) {
  spotify.search({ type: "track", query: query }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    if (data.tracks.items.length === 0) {
      fetchSongs("The Sign");
    } else {
      renderSongs(data.tracks.items);
    }
  });
}

function renderSongs(songs) {
  songs.forEach((song) => {
    console.log("\n" + "Artist: " + song.artists[0].name);
    console.log("Name: " + song.name);
    console.log("Preview: " + song.preview_url);
    console.log("Album: " + song.album.name);
  });
}

function fetchMovie() {
  console.log("fetch movie");
}

function doWhatItSays() {
  console.log("do what it says");
}
