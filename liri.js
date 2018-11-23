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
            console.log("Concerts from ",liriLook,":");

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
            console.log("spotify-this-song was checked.")
            spotify.search({
                type: "track", query: liriLook, limit: 5
                }).then(function(res){
                    // console.log(res);
                    res.tracks.items.forEach(function(songs){
                        console.log(chalk`
Artist: {red ${songs.artists[0].name}}
Song Title: {green ${songs.name}}
Album: {blue ${songs.album.name}}
Spotify Link: {cyan {bgBlue ${songs.external_urls.spotify}}}
                        `);
                    });
                });
            break;


//-----------------------------------movie----------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//-----------------------------------------this-----------------------------------------------------------------
        case "movie-this":
            console.log("movie-this was checked.")
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