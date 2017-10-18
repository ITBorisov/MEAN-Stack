const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database')
const path = require('path');
const router = express.Router();
const cors = require('cors');
//routes
const user = require('./routes/user')(router); 


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Cant connect to the database')
    }else{
        console.log('Connected to the database')
    }
});


app.use(cors({ origin: 'http://localhost:4200' })); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/client/dist'))
app.use('/user', user)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.listen(3001, () =>{
    console.log('Server is running on port 3001')
})