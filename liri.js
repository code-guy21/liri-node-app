const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let query = process.argv.slice(3).join("+");

function liriBot(command, query) {
  clearLog();

  switch (command) {
    case "concert-this":
      fetchConcerts(query);
      break;
    case "spotify-this-song":
      fetchSongs(query);
      break;
    case "movie-this":
      if (query) {
        fetchMovie(query);
      } else {
        fetchMovie("Mr. Nobody");
      }

      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("\nvalid commands:\n");
      console.log("concert-this \t\t\t search for concerts");
      console.log("spotify-this-song \t\t search for a song");
      console.log("movie-this \t\t\t search for a movie");
      console.log("do-what-it-says \t\t runs command from random.txt\n");
  }
}

function fetchConcerts(query) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=codingbootcamp"
    )
    .then((resp) => {
      if (resp.data.length === 0) {
        logData("\nno concerts found :(\n");
      } else {
        renderConcerts(resp.data);
      }
    })
    .catch((err) => {
      logData("\n" + err.message + "\n");
    });
}

function renderConcerts(concerts) {
  concerts.forEach((concert) => {
    let data =
      "Venue: " +
      concert.venue.name +
      "\nLocation: " +
      concert.venue.location +
      "\nDate: " +
      moment(concert.datetime).format("MM/DD/YYYY") +
      "\n\n";

    logData(data);
  });
}

function fetchSongs(query) {
  if (query) {
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
  } else {
    logData(
      "\nYou must specify a search term:\tspotify-this-song <song name here>\n"
    );
  }
}

function renderSongs(songs) {
  songs.forEach((song) => {
    console.log("\n" + "Artist: " + song.artists[0].name);
    console.log("Name: " + song.name);
    console.log("Preview: " + song.preview_url);
    console.log("Album: " + song.album.name);
  });
}

function fetchMovie(movie) {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
    .then((resp) => {
      if (resp.data.Response === "True") {
        console.log("\n" + "Title: " + resp.data.Title);
        console.log("Year: " + resp.data.Year);
        console.log("IMDB Rating: " + resp.data.Ratings[0].Value);
        console.log("Rotten Tomatoes: " + resp.data.Ratings[1].Value);
        console.log("Country: " + resp.data.Country);
        console.log("Language: " + resp.data.Language);
        console.log("Plot: " + resp.data.Plot);
        console.log("Actors: " + resp.data.Actors + "\n");
      } else {
        console.log(resp.data.Error);
      }
    })
    .catch((err) => {
      console.log("\n" + err.message + "\n");
    });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    let command = data.split(",");
    liriBot(command[0], command[1]);
  });
}

function clearLog() {
  fs.writeFile("log.txt", "", function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function logData(data) {
  console.log(data);
  fs.appendFile("log.txt", data, (err) => {
    if (err) {
      return console.log(err);
    }
  });
}

liriBot(command, query);
