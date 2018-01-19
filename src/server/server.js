const express = require('express');
const generateRandomList = require('./utils.js');
const app  = express();
const { list, total } = generateRandomList();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/list', (req, res) => res.json({ list }));

app.get('/total', (req, res) => res.json({ total }));

app.listen(3000, () => console.log('Listening on port 3000!'));