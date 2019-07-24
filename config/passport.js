const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    //Stores user in a session 
    passport.serializeUser((user, done) =>{
        console.log('In the serializer');
        done(null, user);
    });

    //Retrieves user in the session
    passport.deserializeUser((user, done) => {
        //find user
        done(null, user);
    });
}