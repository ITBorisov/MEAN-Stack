const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database')
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Cant connect to the database')
    }else{
        console.log('Connected to the database')
    }
});

app.use(express.static(__dirname + '/client/dist'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.listen(3001, () =>{
    console.log('Server is running on port 3001')
})