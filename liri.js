// NODE program


// Requiring the .env file up first.
require('dotenv').config();
// Variables enabling the specified modules available to liri.js.
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const chalk = require("chalk");


// Making the keys.js file available to be referenced.
const keys = require("./keys.js");
// Import the `keys.js` and store it in a variable. 
const spotify = new Spotify(keys.spotifyKeys);

// Assigning arguments to variables. 
liriDoThis = process.argv[2];
liriLookThis = process.argv.slice(3).join("+");

// Search selection fun times.
console.log(chalk`
You have selected: {green ${liriDoThis}}
To search for: {green ${liriLookThis}}
`);

// Run liribot function with these things.
liriBot(liriDoThis, liriLookThis);


// Function performing each choice using a switch.
function liriBot (liriDo, liriLook){
    

    switch (liriDo) {
//--------------------------------concert----------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//----------------------------------------this-----------------------------------------------------------------
        case "concert-this":
            // Display what user looked up:
            console.log(`Concerts from ${liriLook}`);

            // Set the URL for Bands in Town with search term variable.
            var queryUrl = "https://rest.bandsintown.com/artists/" + liriLook + "/events?app_id=codingbootcamp";

            // Using axios to get the query.
            axios.get(queryUrl).then(function(res, err){
                // For each response object, perform this function
                res.data.forEach(function(concert){
                    // Converting date to my format.
                    var concertDate = concert.datetime.split("T");
                    var momentDate = moment(concertDate[0]).format("DDMMMYYYY");
                    // Prints the information
                    console.log(chalk`
Venue: {red ${concert.venue.name}}
Locaiton: {redBright ${concert.venue.city}},{magenta ${concert.venue.region}},{white ${concert.venue.country}}
Date: {green ${momentDate}}
                    `);
                }); // End of forEach.

            }).catch(function(err){
                console.log("There seems to be a problem.");
            }); 

            break; // End of concert-this.


//--------------------------------spotify-----------------------------------------------------------------------
//----------------------------------------this------------------------------------------------------------------
//---------------------------------------------song-------------------------------------------------------------
        case "spotify-this-song":
            console.log(`Songs from ${liriLook}:`)
            spotify.search({
                type: "track", query: liriLook, limit: 5
                }).then(function(res){
                    // console.log(res);
                    res.tracks.items.forEach(function(songs){
                        console.log(chalk`
Artist: {red ${songs.artists[0].name}}
Song Title: {green ${songs.name}}
Album: {blue ${songs.album.name}}
Spotify Link: {black {bgBlue ${songs.external_urls.spotify}}}
                        `);
                    });
                }).catch(function(err){
                    console.log("There's an issue with the seach. Please try again.");
                })
            break;


//-----------------------------------movie----------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//-----------------------------------------this-----------------------------------------------------------------
        case "movie-this":
            var queryUrl = "http://www.omdbapi.com/?t=" + liriLook + "&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl).then(function(res){
                console.log(chalk`
Movie: {blueBright ${res.data.Title}}({gray ${res.data.Year}})
Plot: {red ${res.data.Plot}}
Players: {green ${res.data.Actors}}
Ratings: {yellow IMDB-${res.data.imdbRating}}, {magenta RottonTomatoes-${res.data.Ratings[1].Value}}
Country: ${res.data.Country} (${res.data.Language})
                `);
            
            }).catch(function(err){
                console.log("Not all those who wander are lost....but I'm wondering if you're lost?");
            })
            break;


//-----------------------------------do-------------------------------------------------------------------------
//--------------------------------------what-it-----------------------------------------------------------------
//-----------------------------------------------says-----------------------------------------------------------
        case "do-what-it-says":
            console.log("do-what-it-says was checked.")
            break;

        default:
            const randomResponse = ["I'm sorry, that doesn't go there.", "Put down the drink and type with two hands!", "Please try that again. I'm a robot, not a linguist."];
            console.log(randomResponse[(Math.floor(Math.random() * Math.floor(randomResponse.length)))]);
            break;

    
    }   // -----End of Switch------

}   // ------End of liriBot Function-----