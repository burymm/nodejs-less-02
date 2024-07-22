const express = require('express');
const app = express();

const router = require('./routes/api');



app.use(express.static('./method-public'));
app.use(express.json());
app.use('/api/people', router);

app.get('/home', (req, res) => {
    res.send('test');
});


app.listen(5100, () => {
    console.log('listing on port 5100');
})