const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './index.html'));
// });

// app.get('/about', (req, res) => {
//     res.send('About page');
// });
//
// app.all('*', (req, res) => {
//     res.status(404).send(`<h1>Resource not found</h1>`)
// });

app.listen(5100, () => {
    console.log('on port 5100');
});