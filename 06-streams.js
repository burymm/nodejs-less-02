// const { writeFileSync } = require('fs');
// for (let i = 0; i < 10000; i += 1) {
//     writeFileSync('./big.txt', `hello ${new Date()}\n`, { flag: 'a' });
// }

const { createReadStream } = require('fs');
const fs = require('fs');
const http = require('http');

const stream = createReadStream('./big.txt', {
    highWaterMark: 90000,
    encoding: 'utf-8',
});



stream.on('error', (error) => {
    console.log(error);
});

stream.on('end', () => {
    console.log('File fully read');
});

http.createServer((
    req, res
) => {
    const fileSteam = fs.createReadStream('./big.txt', 'utf-8');
    fileSteam.on('open', () => {
        fileSteam.pipe(res);

    });

    fileSteam.on('error', (error) => {
        res.end(error);
    });

})
    .listen(5200);