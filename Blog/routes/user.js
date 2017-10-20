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
            res.json({ success: false, message: err });
        }
        if(!user){
            res.json({ success: false, message: 'Invalid login credential' });
        }else{
            const validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({ success: false, message: 'Invalid login credential' });
            }else{
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
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



 router.use((req, res, next) => {
    const token = req.headers['authorization']; 

    if (!token) {
      res.json({ success: false, message: 'No token provided' }); 
    } else {

      jwt.verify(token, config.secret, (err, decoded) => {
        
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); 
        } else {
          req.decoded = decoded; 
          next(); 
        }
      });
    }
  });


 router.get('/profile', (req, res) => {
    // Search for user in database
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
          res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
        }
      }
    });
  });

return router;
}