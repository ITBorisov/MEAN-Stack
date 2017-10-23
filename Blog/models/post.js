const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, require: true},
    message: {type: String, require: true},
    creator: {type: String},
    createdAt: {type: Date, default: Date.now()},
    likes: {type: Number, default: 0},
    likedBy: {type: Array},
    dislike: {type: Number, default: 0},
    dislikedBy: {type: Array},
    comments:[ 
        {
            comment: { type: String },
            comentator: {type: String}
        }
    ]
});



module.exports =  mongoose.model('Post', postSchema);