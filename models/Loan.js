const mongoose = require('mongoose');

const {Schema} = mongoose;

const loanModel = new Schema({
    name: {type: String},
    user_id: {type: String},
    rate: {type: Number},
    duration: {type: Number}, 
    status: {type: Boolean, default: false}
});

module.exports = mongoose.model('Loan', loanModel);