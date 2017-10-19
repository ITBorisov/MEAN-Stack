const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
const config = require('../config/database');

module.exports = (router) => {

router.post('/register', (req, res) => {
    console.log(req.body.username)

    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.save((err) => {
        if(err){
            res.json({ success: false, message: "Cant save user", err})
        }else{
            res.json({ success: true, message: "User is created"})
        }
    })


})

router.post('/login', (req, res) => {

    User.findOne({username: req.body.username}, (err, user) => {
        if(err){
            res.status(500).json({ success: false, message: err });
        }
        if(!user){
            res.status(401).json({ success: false, message: 'Invalid login credential' });
        }else{
            const validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.status(401).json({ success: false, message: 'Invalid login credential' });
            }else{
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                res.json({
                  success: true,
                  message: 'You are logged in as ' + req.body.username ,
                  token: token,
                  user: {username: user.username}
                }); 
            }
        }
    })
})

    return router;
}