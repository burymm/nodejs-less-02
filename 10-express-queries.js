const express = require('express');
const app = express();
const data = require('./data.json');

app.get('/', (req, res) => {
    res.send(`<h1>Home page</h1> <a href="/api/users">users</a>`);
});

app.get('/api/users', (req, res) => {
    res.json(data.map((item) => ({
        name: item.firstName,
        age: item.age,
    })));
});

app.get('/api/v1/query', (req, res) => {
    const keys = Object.keys(req.query);
    res.json(data.filter((item) => {
        let find = 0;
        keys.forEach((key) =>{
            if (item[key] && item[key].includes(req.query[key])) {
                find += 1;
            }
        })
        return find === keys.length;
    }));
});


app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const single = data.find(item => item.id === id);
    if (!single) {
        return res.status(404).send('Product does not exist');
    }

    res.json(single);
});

app.get('/api/users/:id/name/:name', (req, res) => {
    const { name } = req.params;
    res.send(name)
});



app.listen(5100, () => {
    console.log('listing on port 5100');
})