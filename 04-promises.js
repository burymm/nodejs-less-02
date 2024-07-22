const { readFile, writeFile } = require('fs').promises;
// const util = require('util');
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve(data);
//             console.log(data);
//         });
//     });
// }

// getText('./01-data.js')
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(error)
//     });

const start = async() => {
    try {
        const first = await readFile('./01-data.js', 'utf-8');
        const second = await readFile('./02-simple-server.js', 'utf-8');
        await writeFile('./result.txt', `${first}, ${second}`, { flag: 'a' });
        console.log(first);
        console.log(second);
    } catch (err) {
        console.log('error', err);
    }
}

start();
