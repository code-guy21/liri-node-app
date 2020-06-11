const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

//store user input from terminal
let command = process.argv[2];
let query = process.argv.slice(3).join("+");

function liriBot(command, query) {
  //runs command specified by user
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
    case "clear":
      clearLog();
      break;
    default:
      console.log("\nvalid commands:\n");
      console.log("concert-this \t\t\t search for concerts");
      console.log("spotify-this-song \t\t search for a song");
      console.log("movie-this \t\t\t search for a movie");
      console.log("do-what-it-says \t\t runs command from random.txt");
      console.log("clear \t\t\t\t clears data in log.txt\n");
  }
}

function fetchConcerts(query) {
  //request to BandsInTown API
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=codingbootcamp"
    )
    .then((resp) => {
      //check if request returned a response
      if (resp.data.length > 0) {
        //render concert data
        renderConcerts(resp.data);
      } else {
        //notify user that no concerts are available
        logData("\nno concerts found :(\n");
      }
    })
    .catch((err) => {
      //output error
      logData("\n" + err.message + "\n");
    });
}

function renderConcerts(concerts) {
  //loop through concerts
  concerts.forEach((concert) => {
    //organize data into a string
    let data =
      "Venue: " +
      concert.venue.name +
      "\nLocation: " +
      concert.venue.location +
      "\nDate: " +
      moment(concert.datetime).format("MM/DD/YYYY") +
      "\n\n";

    //output concert data
    logData(data);
  });
}

function fetchSongs(query) {
  //check if query is not empty
  if (query) {
    //request to Spotify API
    spotify.search({ type: "track", query: query }, function (err, data) {
      if (err) {
        logData("Error occurred: " + err);
        return;
      }

      //check if request returned any results
      if (data.tracks.items.length > 0) {
        //render song data
        renderSongs(data.tracks.items);
      } else {
        //default track query
        fetchSongs("The Sign");
      }
    });
  } else {
    //notify user to provide a search term
    logData(
      "\nYou must specify a search term:\tspotify-this-song <song name here>\n"
    );
  }
}

function renderSongs(songs) {
  //loop through song results
  songs.forEach((song) => {
    //organize data into string
    let data =
      "\n" +
      "Artist: " +
      song.artists[0].name +
      "\nName: " +
      song.name +
      "\nPreview: " +
      (song.preview_url ? song.preview_url : "No preview available") +
      "\nAlbum: " +
      song.album.name +
      "\n";

    //output data
    logData(data);
  });
}

function fetchMovie(movie) {
  //request to OMDB API
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
    .then((resp) => {
      //check if request came back with a response
      if (resp.data.Response === "True") {
        //organize data into a string
        let data =
          "\n" +
          "Title: " +
          resp.data.Title +
          "\nYear: " +
          resp.data.Year +
          "\nIMDB Rating: " +
          resp.data.Ratings[0].Value +
          "\nRotten Tomatoes: " +
          resp.data.Ratings[1].Value +
          "\nCountry: " +
          resp.data.Country +
          "\nLanguage: " +
          resp.data.Language +
          "\nPlot: " +
          resp.data.Plot +
          "\nActors: " +
          resp.data.Actors +
          "\n";

        //output data
        logData(data);
      } else {
        //output error
        logData(resp.data.Error);
      }
    })
    .catch((err) => {
      logData("\n" + err.message + "\n");
    });
}

function doWhatItSays() {
  //read contents of random.txt
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      logData(err);
      return;
    }

    //parse data from random.txt
    let command = data.split(",");

    //run liriBot
    liriBot(command[0], command[1]);
  });
}

function clearLog() {
  //clear data from log.txt
  fs.writeFile("log.txt", "", function (err) {
    if (err) {
      logData(err);
      return;
    }
  });
}

function logData(data) {
  //output results to terminal
  console.log(data);

  //output results to log.txt
  fs.appendFile("log.txt", data, (err) => {
    if (err) {
      logData(err);
      return;
    }
  });
}

//run liriBot
liriBot(command, query);
