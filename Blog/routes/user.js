const User = require('../models/user');

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
    
})

    return router;
}