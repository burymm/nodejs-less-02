const authorize = (req, res, next) => {
    const { user } = req.query;

    if (user === 'user') {
        req.user = { name: 'user', id: 123};
        next();
    } else {
        res.status(401).send('Unauthorized');
        // console.log('authorize');
        // next();
    }
}

module.exports = authorize;