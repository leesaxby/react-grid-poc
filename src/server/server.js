const express = require('express');
const generateRandomList = require('./utils.js');
const app  = express();
const list = generateRandomList();

app.all('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/',function(req,res){
    res.json(list);
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});