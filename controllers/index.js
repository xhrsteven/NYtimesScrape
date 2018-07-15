var express = require('express');
var router = express.Router();
var db = require('../models');

//router for home page 
router.get('/', function(req, res){
    db.Article.find({})
    .then(function(articleData){
        res.render('home', {articleData:data});
    })
    .catch(function(err){
        res.json(err);
    })
});

module.exports = router;