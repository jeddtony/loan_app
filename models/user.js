const mongoose = require('mongoose');

const {Schema} = mongoose;

const userModel = new Schema({
    name: {type: String},
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    address: {type: String},
    status: {type: String},
    isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userModel);