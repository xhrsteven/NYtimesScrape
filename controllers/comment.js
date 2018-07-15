var express = require('express');
var router = express.Router();
var db = require('../models');

//router to retrieve all comments
router.get('/getComment/:id', function(req,res){
    db.Article.findOne({_id: req.params.id})
    .populate('comment')
    .then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err){
        return res.json(err);
    })
});

//route to return single comment to view
router.get('/getSingleComment/:id', function(req, res){
    db.comment.findOne({_id:req.params.id})
    .then(function(result){
        res.json(result);
    })
    .catch(function(err){
        return res.json(err);
    })
})


//post route to create new comment
router.post('/createComment', function(req,res){
    let {title, body, articleId} = req.body;
    let comment = {
        title,
        body
    }
    //Create new comment and pass req.body to the entry
    db.Comment.create(comment)
        .then(function(result){
            return db.Article.findOneAndUpdate({_id: articleId},  {$push: {comment: dbComment._id}}, {new: true});
        })
        .then(function(data){
            res.json(result);
        })
        .catch(function(err){
            return res.json(err);
        })
});

router.post('/deleteComment', function(req, res){
    let{articleId, commentId} =req.body;
    db.Comment.remove({_id:commentId})
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            return res.json(err);
        })
})

module.exports = router;