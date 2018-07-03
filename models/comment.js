var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
// Using the Schema constructor, create a new NoteSchema object
var CommentSchema = new Schema({
    body: {
        type:String,
        validate: [
            function(input){
                return input.length >= 1;
            },
            'Comment should not be blank.'
        ]
    }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;