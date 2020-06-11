# LIRI Bot

LIRI Bot is a command line node appplication that allows users to request data from these API's

- `Spotify`
- `OMDB`
- `BandsInTown`

It was built using these dependencies

- [`node-spotify-api`](https://www.npmjs.com/package/node-spotify-api)
- [`axios`](https://www.npmjs.com/package/axios)
- [`moment`](https://www.npmjs.com/package/moment)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`fs`](https://nodejs.org/api/fs.html)

## Installing LIRI Bot

1. Clone the repo to your computer
2. Run `npm -i` to install node packages
3. Create a `.env` file in the same directory
4. Add the following piece of code to `.env` but replace the ID and Secret with our own credentials

   ```js
   # Spotify API keys

   SPOTIFY_ID=your-spotify-id
   SPOTIFY_SECRET=your-spotify-secret

   ```

   if you need help getting Spotify keys continue reading, otherwise skip to **Using Liri Bot**

### Spotify Keys

In order to run LIRI Bot you will need to your own Spotify API credentials.

1. Go to [Spotify Developer](https://developer.spotify.com/dashboard/login)
2. Login with your Spotify account or create one
3. Go to your dashboard and create a new app
4. When you click on your app you will see
   - Client ID
   - Client Secret

## Using LIRI Bot

Once you have LIRI Bot installed you can run commands with the following format

`node liri.js <command> <query>`

### Commands

1. **spotify-this-song**

   - Accepts a search term for a song
   - Makes a request to the Spotify API
   - Outputs the response to the console and log.txt

   example:

   `node liri.js spotify-this-song comfortably numb`

2. **concert-this**

   - Accepts a search term for an artist/band
   - Makes a request to the BandsInTown API
   - Outputs the response to the console and log.txt

   example:

   `node liri.js concert-this elton john`

3. **movie-this**

   - Accepts a search term for an movie title
   - Makes a request to the OMDB API
   - Outputs the response to the console and log.txt

   example:

   `node liri.js movie-this pulp fiction`

4. **do-what-it-says**

   - Parses command & query from random.txt
   - Runs specified command with query
   - Outputs the response to the console and log.txt

   example:

   _random.txt_
   `spotify-this-song,Hey Jude`

   _command line_
   `node liri.js do-what-it-says`
