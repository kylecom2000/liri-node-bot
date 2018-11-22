// ODESSA or ALLEGRA

// Requiring the .env file up first.
require('dotenv').config();
// Variables enabling the specified modules available to liri.js.
const Axios = require('axios');
const Spotify = require('node-spotify-api');
const Moment = require('moment');
const Chalk = require('chalk');


// Making the keys.js file available to be referenced.
const keys = require("./keys.js");
// Code required to import the `keys.js` file and store it in a variable. 
const spotify = new Spotify(keys.spotify);

liriDoThis = process.argv[2];
liriLookThis = process.argv.slice(3);

console.log("liriDoThis: ", liriDoThis, "liriLookThis: ", liriLookThis);

liriBot(liriDoThis, liriLookThis);


// 9. Make it so liri.js can take in one of the following commands:
function liriBot (liriDo, liriLook){
    

    switch (liriDo) {

//--------------------------------concert-this-----------------------------------------
        case "concert-this":
            var queryUrl = "https://rest.bandsintown.com/artists/" + liriLook + "/events?app_id=codingbootcamp"
            Axios.get(queryUrl).then(function(res){
                res.data.forEach(function(concert){
                    console.log
(`
Venue: ${concert.venue.name}
Location: ${concert.venue.city},  ${concert.venue.region},  ${concert.venue.country}
Date: ${concert.datetime}
`);
                })
               
                


            }).catch(function(err){
                console.log("Please search for bands that exist.");
            })
            break;


//--------------------------------spotify-this-song-------------------------------------
        case "spotify-this-song":
            console.log("spotify-this-song was checked.")
            break;


//-----------------------------------movie-this-----------------------------------------
        case "movie-this":
            console.log("movie-this was checked.")
            break;


//-----------------------------------movie-this-----------------------------------------
        case "do-what-it-says":
            console.log("do-what-it-says was checked.")
            break;

        default:
            const randomResponse = ["I'm sorry, that doesn't go there.", "Put down the drink and type with two hands!", "Please try that again. I'm a robot, not a linguist."];
            console.log(randomResponse[(Math.floor(Math.random() * Math.floor(randomResponse.length)))]);
            break;
    }
}