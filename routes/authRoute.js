var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var User = require('../models/user');

function routes(User){
    var router = express.Router();
    router.route('/signup')
    .get((req, res)=>{
        res.send('Ok this route is functional');
    })
    .post((req, res)=>{
       
    if(!req.body.email || !req.body.password){
        res.json({success: false, msg: 'Please pass email and password'});
    } else{
        const hashPassword = (password, saltRounds) => bcrypt.hash(password, saltRounds);
        hashedPassword = hashPassword(req.body.password, 10)
        .then(hash => {
            var newUser = new User({
                email: req.body.email,
                password: hash
            });
            //save the user
            newUser.save(function(err){
                if(err) {
                    console.log(err);
                    return res.json({success: false, msg: 'Email already exists.'});
                }
                res.json({success: true, msg: 'Successfully created a new user'});
            });       
        })
        .catch(error => error);
        
    }
});

return router;
}

module.exports = routes;