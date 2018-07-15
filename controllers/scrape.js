var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var db = require('../models');

router.get('/scrape',function(req, res){
    db.Article.find({})
        .then(function(CurrentArticlesTitiles){
            var CurrentArticleTitles =[];
            for(var i=0; i< CurrentArticles.length; i++){
                CurrentArticleTitles.push(CurrentArticles[i].title);
            }

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
        .catch(function(err){
            res.json(err);
        })      
    });
    
    module.exports =router;
