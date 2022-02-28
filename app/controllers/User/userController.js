const User = require('../../model/User/user');
const UserDetails = require('../../model/User/userDetails');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.register = (req, res) => {
    const body = req.body;
    const user = new User(body);
    bcrypt.genSalt()
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted;
                    user.save()
                        .then((user) => {
                            res.status(201).json(user);
                        })
                        .catch((err) => {
                            res.json(err.message)
                        });
                })
                .catch((err) => {
                    res.json(err.message)
                })
        })
        .catch((err) => {
            res.json(err.message)
        });
};

userController.login = (req, res) => {
    const body = req.body;
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: "Invalid Email Address" });
            }
            bcrypt.compare(body.password, user.password)
                .then((match) => {
                    if (match) {
                        // do something
                        const tokenData = {
                            _id: user._id,
                            email: user.email
                        }
                        const token = jwt.sign(tokenData, 'auth', { expiresIn: '1d' });
                        res.status(200).json({
                            _id: user._id,
                            email: user.email,
                            token: `Bearer ${token}`
                        })
                    } else {
                         res.status(401).json({ message: "Password Didn't match" });
                    }
                })
                .catch((err) => {
                    res.json(err.message)
                })
        })
        .catch((err) => {
            res.json(err.message)
        })
}

userController.profile = (req, res) => {

    const userId = req.user._id.toString()
    const id = req.params.id;

    UserDetails.findOne({ userId: userId })
        .then((user) => {
            if (id === userId) {
                if (user) {
                     res.json({
                        _id : userId
                    })
                } else {
                    res.json({ "message": "profile not added"})
                }
            } else {
                 res.status(403).json({ "message": "userId invalid"})
            }
        })
        .catch((err) => {
            res.json(err.message)
        })
}


module.exports  = userController