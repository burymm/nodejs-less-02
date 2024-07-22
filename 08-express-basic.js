const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('home page accesed')
    res.send('Home page');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.all('*', (req, res) => {
    res.status(404).send(`<h1>Resource not found</h1>`)
});

app.listen(5100, () => {
    console.log('on port 5100');
});