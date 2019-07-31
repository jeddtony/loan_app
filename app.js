const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();

if(process.env.ENV === 'Test'){
    console.log('This is a test');
    const db = mongoose.connect('mongodb://localhost/laonappdb_Test');
  }else{
    console.log('This is for real')
    const db = mongoose.connect('mongodb://localhost/loanappdb');
    console.log('connected to the db');
  }

const Loan = require('./models/Loan');
const User = require('./models/user');
const loanRouter = require('./routes/loanRoute')(Loan);
const authRouter = require('./routes/authRoute')(User);
const factoryRouter = require('./routes/factoryroutes')(Loan, User);

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./config/passport.js')(app);

app.use('/api', loanRouter);
app.use('/auth', authRouter);
app.use('/seed', factoryRouter);


app.get('/', (req, res) => {
    res.send('Welcome to my Node API');
})
const port = process.env.PORT || 3000;

app.server = app.listen(port, () => {
    console.log(`running on port ${port}`);
});

module.exports = app;