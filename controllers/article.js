var express = require('express');
var router = express.Router();
var db = require('../models');

//get route to update 'saved'
router.get('/saved/:id', function(req,res){
    db.Article.update({_id:req.params.id}, {saved: true})
        .then(function(result){
            res.redirect('/');
        })
});

//router to render saved articles
router.get('/saved', function(req,res){
    db.Article.find({saved: true})
    .then(function(articleData){
        res.render('saved', {articleData: data});
    })
    .catch(function(err){
        res.json(err);
    })
})

//delete route to remove articel
router.delete('/deleteArticle/:id', function(req, res){
    db.Article.remove({_id:req.params.id})
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.json(err);
        })
})

module.exports = router;