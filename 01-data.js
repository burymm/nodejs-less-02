const express = require('express');
const os = require('os');
const app = express();
const path = require('path')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', (req, res) => {
    res.render('about');
});


app.get('/user/:username', (req, res) => {
    res.render('user', {
        username: req.params.username,
    });
});

app.post('/check-user', (req, res) => {
    let username = req.body.username;
    if (username === '') {
        return res.redirect('/');
    } else {
        return res.redirect(`/user/${username}`);
    }
});

const user = os.userInfo()
console.log(user)

console.log(`system uptime time ${ Math.round(os.uptime() / 60 / 60 / 24) } days`)

const currentOs = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem() / 1024 / 1024,
    freeMem: os.freemem() / 1024 / 1024,
}

console.log(currentOs);
console.log(path.resolve(__dirname))




// const PORT = 3000;
//
// app.listen(PORT, () => {
//     console.log(`server started http://localhost:${PORT}`);
// });