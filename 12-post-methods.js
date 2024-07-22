const express = require('express');
const app = express();

let userData = require('./data.json');
const fs = require('fs');

function getId(data) {
    let max = 0;
    data.forEach((item) => {
        if (+item.id > max) {
            max = +item.id;
        }
    });

    return max + 1;
}

function findDuplicate(data, name) {
    return data.find((item) => {
        return item.name === name;
    })
}

app.use(express.static('./method-public'));
app.use(express.json());

app.post('/api/people', (req, res) => {
    console.log(req.body);
    const data = req.body;
    const realUserData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    const duplicate = findDuplicate(realUserData, data.name);
    console.log(duplicate);
    if (duplicate) {
        res.status(409).json({
            status: false,
            data: {
                error: 'Name already exist',
            }
        });
        return;
    }

    const newId = getId(realUserData);
    console.log('new Id ', newId);
    const newUser = {
        id: newId,
        ...data,
    }


    fs.writeFileSync('./data.json', JSON.stringify([
        ...realUserData,
        newUser,
    ]));


    res.status(200).json({
        success: true,
        data: newUser,
    });
});


app.get('/api/people', (req, res) => {
    res.status(200).json({
            success: true,
            data: userData,
        }
    );
});


app.listen(5100, () => {
    console.log('listing on port 5100');
})