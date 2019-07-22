const mongoose = require('mongoose');

const {Schema} = mongoose;

const loanModel = new Schema({
    userId: {type: String},
    tenor: {type: Number},
    status: {type: String},
    repaid: {type: Boolean, default: false},
    amount: {type: Number},
    paymentInstallment: {type: Number},
    balance: {type: Number},
    interest: {type: Number},
    createdOn: {type: Date, default: Date.now},
    updatedOn: {type: Date}
});

module.exports = mongoose.model('Loan', loanModel);