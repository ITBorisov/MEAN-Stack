const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
const config = require('../config/database');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an e-mail' }); 
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide a username' }); 
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' }); 
                }else{
                    let user = new User({
                        username: req.body.username.toLowerCase(),
                        password: req.body.password,
                        email: req.body.email.toLowerCase()
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
                            } else {
                                res.json({ success: false, message: "Cant save user", err })
                            }
                        } else {
                            res.json({ success: true, message: "User is created" })
                        }
                    })
                }
            }
        }
    })

    router.post('/login', (req, res) => {
       
        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' }); 
        } else {
          
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided.' }); 
            } else {
                
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    
                    if (err) {
                        res.json({ success: false, message: err }); 
                    } else {
                        
                        if (!user) {
                            res.json({ success: false, message: 'Username not found.' }); 
                        } else {
                            const validPassword = user.comparePassword(req.body.password); 

                            if (!validPassword) {
                                res.json({ success: false, message: 'Password invalid' }); 
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); 
                                res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } }); 
                            }
                        }
                    }
                });
            }
        }
    });

    return router;
}

