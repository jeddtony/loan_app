const mongoose = require('mongoose');

const {Schema} = mongoose;

const adminModel = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
});

module.exports = mongoose.model('Admin', adminModel);