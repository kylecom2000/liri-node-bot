# liri-node-bot
## LIRI is a _Language_ Interpretation and Recognition Interface. 
## LIRI is a command line node app that takes in parameters and gives you back data.

## Main Contributor: Kyle Bauer

### UT Coding Bootcamp homework, November 2018
#### Requirments
* Node Spotify ID and Secret in a .env file.

* Axios used for a few commands.

* 'npm install' of node modules.

* Four Commands using the 3rd process.argv item.
  1. `concert-this` [_Screen Shot_](/images/movie-this/concert-this.png)
     - Search Bands in Town Artist Events API for an artist and renders:
       1. Name of the venue
       2. Venue location
       3. Date of the Event
  2. `spotify-this-song` [_Screen Shot_](/images/spotify-this-song.png)
     - Search Spotify and return:
       1. Artist(s)
       2. The song's name
       3. A preview link of the song from Spotify
       4. The album that the song is from
     - If no song is provided then your program will default to "The Sign" by Ace of Base.
  3. `movie-this` :movie_camera: [_Screen Shot_](/images/movie-this/movie-this.png)
     - Output:
       1. Title of the movie.
       2. Year the movie came out.
       3. IMDB Rating of the movie.
       4. Rotten Tomatoes Rating of the movie.
       5. Country where the movie was produced.
       6. Language of the movie.
       7. Plot of the movie.
       8. Actors in the movie.
     - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  4. `do-what-it-says` [_Screen Shot_](/images/movie-this/do-what-it-says.png)
      - Using the `fs` Node package, perform search from random.txt


#### BONUS
* Output the search data to a .txt file called `log.txt`.