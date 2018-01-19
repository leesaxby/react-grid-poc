const express = require('express');
const generateRandomList = require('./utils.js');
const app  = express();
const data = generateRandomList();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/list',function(req,res){
    res.json({ list: data.list });
});

app.get('/total',function(req,res){
    res.json({ total: data.totalCount });
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});