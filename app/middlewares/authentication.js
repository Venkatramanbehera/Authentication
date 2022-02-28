const jwt = require('jsonwebtoken');
const User = require('../model/User/user');

const authenticationUser = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    let tokenData;

    try {
        tokenData = jwt.verify(token, 'auth');
        User.findById(tokenData._id)
            .then((user) => {
                req.user = user;
                next();
            })
            .catch((err) => {
                res.status(401).json(err.message)
            })
    } catch(error) {
        res.json(error.message)
    }
}

module.exports = {
    authenticationUser
}