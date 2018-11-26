// NODE program


// Requiring the .env file up first.
require('dotenv').config();
// Variables enabling the specified modules available to liri.js.
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const chalk = require("chalk");
const fs = require("fs")


// Making the keys.js file available to be referenced.
const keys = require("./keys.js");
// Import the `keys.js` and store it in a variable. 
const spotify = new Spotify(keys.spotifyKeys);

// Assigning arguments to variables. 
const liriDoThis = process.argv[2];
const liriLookThis = process.argv.slice(3).join("+");

// Search selection fun times.
console.log(chalk`
You have selected: {green ${liriDoThis}}
To search for: {green ${liriLookThis}}
`);

// Run liribot function with these things.
liriBot(liriDoThis, liriLookThis);


// Function performing each choice using a switch.
function liriBot (liriDo, liriLook){
    var searchLog = `${liriDo}, ${liriLook}`

    switch (liriDo) {
//--------------------------------concert-----------------------------------------
//--------------------------------------------------------------------------------
//----------------------------------------this------------------------------------
        case "concert-this":
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
                    // Log.txt variable without chalk colors.
                    var printed = `
Venue: ${concert.venue.name}
Locaiton: ${concert.venue.city}, ${concert.venue.region}, ${concert.venue.country}
Date: ${momentDate}
                    `;
                    // Logs information to log.txt
                    logBook(searchLog, printed);
                }); // End of forEach.

            }).catch(function(err){
                console.log("There seems to be a problem.");
            }); 

            break; // End of concert-this.


//--------------------------------spotify--------------------------------------------
//----------------------------------------this---------------------------------------
//---------------------------------------------song----------------------------------
        case "spotify-this-song":

            // If no liriLook then do ace of base
            const spotifySearch = liriLook || "The+Sign+Ace+of+Base";

            spotify.search({
                type: "track", query: spotifySearch, limit: 5
                }).then(function(res){
                    // console.log(res);
                    res.tracks.items.forEach(function(songs){
            
                        
                        console.log(chalk`
Artist: {red ${songs.artists[0].name}}
Song Title: {green ${songs.name}}
Album: {blue ${songs.album.name}}
Spotify Link: {black {bgBlue ${songs.external_urls.spotify}}}
                        `);
                        // Log.txt variable without chalk colors.
                        var printed = `
Artist: ${songs.artists[0].name}
Song Title: ${songs.name}
Album: ${songs.album.name}
Spotify Link: ${songs.external_urls.spotify}
                        `;
                        // Function called to print to log.
                        logBook(searchLog, printed);

                    });
                }).catch(function(err){
                    console.log("There's an issue with the seach. Please try again.");
                })
            break;


//-----------------------------------movie--------------------------------------------
//------------------------------------------------------------------------------------
//-----------------------------------------this---------------------------------------
        case "movie-this":
            // if no movie search, then Mr. Nobody.
            const movieSearch = liriLook || "Mr+Nobody";
            var queryUrl = "http://www.omdbapi.com/?t="+movieSearch+"&y=&plot=short&apikey=trilogy";

            axios.get(queryUrl).then(function(res){
                console.log(chalk`
Movie: {blueBright ${res.data.Title}}({gray ${res.data.Year}})
Plot: {red ${res.data.Plot}}
Players: {green ${res.data.Actors}}
Ratings: {yellow IMDB-${res.data.imdbRating}}, {magenta RottonTomatoes-${res.data.Ratings[1].Value}}
Country: ${res.data.Country} (${res.data.Language})
                `);
                // Log.txt variable without chalk colors.
                var printed = `
Movie: ${res.data.Title} (${res.data.Year})
Plot: ${res.data.Plot}
Players: ${res.data.Actors}
Ratings: IMDB-${res.data.imdbRating}, RottonTomatoes-${res.data.Ratings[1].Value}
Country: ${res.data.Country} (${res.data.Language})
                `;

                logBook(searchLog, printed);
            }).catch(function(err){
                console.log("Not all those who wander are lost....but I'm wondering if you're lost?");
            })
            break;


//-----------------------------------do------------------------------------------------
//--------------------------------------what-it----------------------------------------
//-----------------------------------------------says----------------------------------
        case "do-what-it-says":
            fs.readFile('random.txt', 'utf8', function(err, res){
                var whatItSays = res.split(",");
                liriBot(whatItSays[0],whatItSays[1],);
                if(err){
                    console.log(chalk`
{red There's something wrong with your txt file.}
                    `)
                }
            })


            break;


//--------------------------------------End-of-Cases-----------------------------------
        default:
            const randomResponse = ["I'm sorry, that doesn't go there.", "Put down the drink and type with two hands!", "Please try that again. I'm a robot, not a linguist."];
            console.log(randomResponse[(Math.floor(Math.random() * Math.floor(randomResponse.length)))]);
            break;

    
    }   // -----End of Switch------

}   // ------End of liriBot Function-----



// Logbook function.
function logBook(searchLog, printed) {
    fs.appendFile("log.txt", `\r${searchLog}\n${printed}`, function (err) {
        if (err) {
            console.log("\r\nUnable to create a log entry.");
        }
    });
}