const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;

const userModel = new Schema({
    name: {type: String},
    email: {type: String, unique:true, required:true},
    password: {type: String, required: true},
    address: {type: String},
    occupation: {type: String},
    office_address: {type: String},
    phone_number: {type: String}
});



userModel.methods.comparePassword = function (passw, cb){
    bcrypt.compare(passw, this.password, (err, isMatch)=>{
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    });
}
module.exports = mongoose.model('User', userModel);