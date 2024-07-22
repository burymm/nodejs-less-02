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

const getUsers = (req, res) => {
    const realUserData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    res.status(200).json({
            success: true,
            data: realUserData,
        }
    );
};

const createUser = (req, res) => {
    console.log(req.body);
    const data = req.body;
    if (!data.name) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Name is required'
            });
    }

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
};

const updateUser = (req, res) => {
    const data = req.body;
    const {id} = req.params;
    if (!data.name) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Name is required'
            });
    }

    if (!id) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Id is required'
            });
    }

    const realUserData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    const userIndex = realUserData.findIndex((user) => user.id?.toString() === id.toString());

    if (userIndex < 0) {
        return res
            .status(404)
            .json({
                success: false,
                message: 'User not found',
            });
    }

    if (realUserData[userIndex].name === data.name) {
        return res
            .status(409)
            .json({
                status: false,
                message: `User with id ${id} already have name ${data.name}`,
            });
    }

    realUserData[userIndex].name = data.name;

    fs.writeFileSync('./data.json', JSON.stringify([
        ...realUserData,
    ]));

    return res
        .status(201)
        .json({
            status: true,
            data: realUserData[userIndex],
        });

};

const deleteUser = (req, res) => {
    const data = req.body;
    const {id} = req.params;

    if (!id) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Id is required'
            });
    }

    const realUserData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    const userIndex = realUserData.findIndex((user) => user.id?.toString() === id.toString());

    if (userIndex < 0) {
        return res
            .status(404)
            .json({
                success: false,
                message: 'User not found',
            });
    }

    fs.writeFileSync('./data.json', JSON.stringify([
        ...realUserData.filter(user => user?.id?.toString() !== id.toString()),
    ]));

    return res
        .status(201)
        .json({
            status: true,
            data: realUserData[userIndex],
        });

};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};