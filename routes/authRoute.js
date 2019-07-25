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

    router.route('/signin')
    .post((req, res) =>{
        User.findOne({
            email: req.body.email
        }, function(err, user){
            if(err) throw err;
            
            if(!user){
                res.status(401).send({success: false, msg: 'Authentication failed. User not found'});
            } else{
                // check if password matches
              bcrypt.compare(req.body.password, user.password, function(err, ress){
                if(ress && !err){
                    console.log('The user is signed in');
                    // var token = jwt.sign(user.toJSON())
                    jwt.sign({user}, 'secretkey', {expiresIn: '300s'},  (err, token) => {
                        res.json({
                            token
                        })
                    })
                }    
                });
               
            }
        })
    });

    // For the signout
    router.get('/signout', verifyToken, function(req, res) {
        req.logout();
        res.json({success: true, msg: 'Sign out successfully.'});
      });

    router.route('/profile')
    .all((req, res, next) => {
        if(req.user){
            next();
        } else{
            res.redirect('/');
        }
    })
    .get((req, res)=>{
        console.log('The authentication passed');
        res.json(req.user);
    });

    router.route('/failure').get((req, res) => {
        res.send('Ok this failed');
    });

return router;
}

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// verify token
function verifyToken(req, res, next){
    // Get auth header value or actual token
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();  
    }else{
        // Forbidden
        res.sendStatus(403);
    }
}
module.exports = routes;