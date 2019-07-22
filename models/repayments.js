const mongoose = require('mongoose');

const {Schema} = mongoose;

const repaymentModel = new Schema({
    loanId: {type: Number},
    amount: {type: Number},
    createdOn: {type: Date, default: Date.now},
    updatedOn: {type: Date}
});

module.exports = mongoose.model('Repayment', repaymentModel);