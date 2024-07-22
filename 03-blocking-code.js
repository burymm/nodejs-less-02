const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Home page');
        return;
    }

    if (req.url === '/about') {
        for (let i = 0; i < 1000; i+= 1) {
            for (let j = 0; j < 1000; j += 1) {
                console.log(`${i} ${j}`);
            }
        }
        res.end('About page');
        return;
    }

    res.end('404 page');
});

server.listen(3000, () => {
    console.log('Working http://localhost:3000');
});