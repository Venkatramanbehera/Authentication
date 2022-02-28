const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId should be mandatory']
    },
     phoneNumber: {
        type: Number,
        required: [true, 'number should be mandatory']
    },
    dateOfBirth: {
        type: Date,
        default: Date.now(),
        required: [true, 'date of birth should be mandatory']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: [true, 'gender should be mandatory']
    },
    address: {
        type: String,
        required: [true, 'address should be mandatory'],
    }
})

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails