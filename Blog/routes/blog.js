const Post = require('../models/post');
const jwt = require('jsonwebtoken'); 
const config = require('../config/database');

module.exports = (router) => {

router.post('/newPost', (req, res) => {

    const post = new Post({
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator
    })

    post.save((err) => {
        if(err){
            res.json({ success: false, message: "Cant save the post", err})
        }else{
            res.json({ success: true, message: "Post is created"})
        }
    })
})

return router;
}