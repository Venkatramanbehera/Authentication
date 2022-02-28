const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isEmail = require('validator/lib/isEmail');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is mandatory'],
        unique: true,
        validate: async (value) => {
            try {
                const result = await User.findOne({ email: value });
                if (!isEmail(value)) {
                    throw new Error('please enter the valid email');
                }
                if (result) {
                    throw new Error('email id is already present');
                }
            } catch(error) {
                throw new Error(error);
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8,
        maxlength: 128
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User