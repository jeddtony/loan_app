const mongoose = require('mongoose');

const {Schema} = mongoose;

const userModel = new Schema({
    name: {type: String},
    email: {type: String},
    address: {type: String},
    occupation: {type: String},
    office_address: {type: String},
    phone_number: {type: String}
});

module.exports = mongoose.model('User', userModel);