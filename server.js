var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var request =require('request');
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
//Set up app use handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Use deployed database
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/NYTScraper';

//Connect to MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Routes

// A Get route for home page
app.get('/', function(req, res){
    db.Article.find({}, function (err, data) {
        if(err) throw err;
        res.render('home', {articleData: data});
    });
});

//Saved page where save is true and render saved handlebars
app.get('/saved', function(req,res){
    db.Article.find({saved: true}, function(err, data){
        if (err) throw err;
        res.render('saved', {articleData: data});        
    });
});

// Route for scraping data
app.get('/scrape',function(req, res){
    db.Article.find({}, function(err,CurrentArticles){
        if(err) throw err;
        var CurrentArticleTitles =[];
        for(var i=0; i< CurrentArticles.length; i++){
            CurrentArticleTitles.push(CurrentArticles[i].title);
        }

        //grab html
        request('http://www.nytimes.com/section/world', function(err,response, html){
            var $ = cheerio.load(html);
            $('li article').each(function(i, element){
                var result = {};
                if(CurrentArticleTitles.indexOf($(element).find('h2')) === -1){
                    result.title = $(element).find('h2').text().trim();
                    result.summary =$(element).find('p.summary').text().trim();
                    result.link = $(element).find('a').attr('href');
                    result.image = $(element).find('img').attr('src');
                    //create new article 
                    db.Article.create(result)
                        .then(function(dbArticle){
                        console.log(dbArticle);
                         })
                        .catch(function(err){
                            return res.json(err);
                        })    
                };    
            })
             //when successfully scape redirect to home
            res.redirect('/')   
        });
    })
})

// Route for updating articles in db for saved/unsaved
app.put('/articles/:id', function(req, res){
    db.Article.update({_id: req.params.id},{$set: req.body}, function(err, result){
        if(err) throw err;
        console.log(result);
        res.sendStatus(200);
    });
});

app.post('/articles/:id', function(req,res){
    //Create new comment and pass req.body to the entry
    db.Comment.create(req.body)
        .then(function(dbComment){
            return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {comments: dbComment._id}}, {new: true});
        })
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            return res.json(err);
        })
});

//Route for grabbing specific article by id
app.get('/articles/:id', function(req,res){
    db.Article.find({_id: req.params.id})
    .populate('comments')
    .then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err){
        return res.json(err);
    })
});

//Route for deleting comments
app.delete('/comments/:id', function(req, res){
    db.Comment.remove({_id: req.params.id}, function(err, data){
        if(err) throw err;
        console.log(data);
        res.sendStatus(200);
    })
})

app.listen(PORT, function(){
    console.log('http://localhost:'+PORT);
})