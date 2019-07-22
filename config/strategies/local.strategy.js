const passport = require('passport');
const {Strategy} = require('passport-local');
const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

module.exports = function localStrategy(){
    passport.use(new Strategy({
        emailField: 'email',
        passwordField: 'password'
    }, (email, password, done) =>{
        const url = 'mongodb://localhost:27017';
        const dbName = 'loanappdb';
        ( async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);

                const db = client.db(dbName);
                const col = db.collection('users');

                const user = await col.findOne({email});
                if(bcrypt.compare(password, user.password, function(err, res){
                    return res;
                })){
                    done(null, user);
                } else{
                    done(null, false);
                }
            } catch(err){
                console.log(err.stack);
            }
            // close connection
            client.close;
        }())
    }))
}