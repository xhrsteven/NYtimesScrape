var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios =require('axios');
var cheerio = require('cheerio');

var db= require('./models');

var PORT = process.env.PORT | 8080;

//Initialize Express
var app = express();

//Configure middleware

//Use morgan logger for logging request
app.use(logger('dev'));
//Use bodyParser for handling for submissions
app.use(bodyParser.urlencoded({extended: true}));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

//Connect to Mongo DB
mongoose.connect('mongodb://localhost/NewYorkTimes');

//Routes

// A Get route for scraping the website
app.get('/scrape', function(req, res){
    // First, we grab the body of the html with request
    axios.get('https://www.nytimes.com').then(function(response){
        //Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

    })
})

app.listen(PORT, function(){
    console.log('http://localhost:'+PORT);
})