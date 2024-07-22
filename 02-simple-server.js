const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/' ) {
        res.write(`<h1>Main page</h1>`);
    } else if (req.url === '/about' ) {
        res.write(`<h1>About page</h1>`);
    } else {
        res.end(`
    <h1>Page not found</h1>
    <a href="/">Return to home page</a>
    <footer>
        this is footer
    </footer>
    `);
    }
});

server.listen(5100);