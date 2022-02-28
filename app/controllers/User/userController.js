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

    UserDetails.findOne({ userId: userId })
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                res.json({ "message": "profile not added" })
            }

        })
        .catch((err) => {
            res.json(err.message)
        })
};

userController.createProfile = (req, res, next) => {
    const body = req.body;
    const id = req.user._id.toString();

    UserDetails.findOne({ userId: id })
        .then((user) => {
            if (user) {
                res.json({
                    message: "user already created",
                    data: user
                });
            } else {
                const userDetails = new UserDetails(body);
                userDetails.userId = id;
                
                userDetails.save()
                    .then((userData) => {
                        res.status(201).json(userData);
                    })
                    .catch((err) => {
                        res.json(err.message)
                    })
            }
        })
        .catch((err) => {
            res.json(err.message)
        })
}

userController.updateProfile = (req, res, next) => {
    const body = req.body;
    const userId = req.user._id.toString();

    UserDetails.findOne({ userId: userId })
        .then((user) => {
            const id = user._id
            // res.json(user);
            UserDetails.findByIdAndUpdate(id, body, { new: true, runValidators: true})
                .then((user) => {
                    res.json(user)
                })
                .catch((err) => {
                    res.json(err.message)
                })
        })
        .catch((err) => res.json(err.message))

}

module.exports  = userController